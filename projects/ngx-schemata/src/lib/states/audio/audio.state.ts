import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/compat/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Audio } from '@lamnhan/schemata';
import { AudioDataService } from '../../services/audio/audio.service';

export interface AudioStateModel {
  locale: string;
  defaultList: Record<string, Audio[]>;
  queryList: Record<string, Audio[]>;
  itemRecord: Record<string, Audio>;
}

export class AudioList {
  static readonly type = '[Audio] List';
  constructor(public type = 'default', public locale: string) {}
}

export class AudioQuery {
  static readonly type = '[Audio] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class AudioItem {
  static readonly type = '[Audio] Item';
  constructor(public id: string) {}
}

@State<AudioStateModel>({
  name: 'audio',
  defaults: {
    locale: '',
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class AudioState {

  constructor(private dataService: AudioDataService) {}

  @Action(AudioList)
  audioList({getState, patchState}: StateContext<AudioStateModel>, action: AudioList) {
    const {locale: currentLocale, defaultList: currentDefaultList} = getState();
    const {type, locale} = action;
    if (currentLocale === locale && currentDefaultList?.[type].length) {
      return of(currentDefaultList[type]);
    }
    return this.dataService
      .list(
        ref => ref
          .where('status', '==', 'publish')
          .where('type', '==', type)
          .where('locale', '==', locale)
          .orderBy('createdAt', 'desc'),
        { name: `[Audio] status=publish type=${type} locale=${locale} createdAt=desc` }
      )
      .pipe(
        tap(items =>
          patchState({
            locale,
            defaultList: {
              ...currentDefaultList,
              [type]: items,
            },
          })
        ),
      );
  }

  @Action(AudioQuery)
  audioQuery({getState, patchState}: StateContext<AudioStateModel>, action: AudioQuery) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId].length) {
      return of(currentQueryList[queryId]);
    }
    return this.dataService
      .list(queryFn, {name: `[Audio] ${queryId}`})
      .pipe(
        tap(items =>
          patchState({
            queryList: {
              ...currentQueryList,
              [queryId]: items,
            },
          })
        ),
      );
  }

  @Action(AudioItem)
  audioItem({getState, patchState}: StateContext<AudioStateModel>, action: AudioItem) {
    const {itemRecord: currentItemRecord} = getState();
    const {id} = action;
    if (currentItemRecord[id]) {      
      return of(currentItemRecord[id]);
    }
    return this.dataService
      .get(id)
      .pipe(
        tap(item =>
          !item ? false : patchState({
            itemRecord: {
              ...currentItemRecord,
              [id]: item,
            },
          })
        ),
      );
  }
}
