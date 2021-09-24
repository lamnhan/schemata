import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/compat/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Audio } from '@lamnhan/schemata';
import { DatabaseDataSearchingIndexData, DatabaseDataSearchResult } from '@lamnhan/ngx-useful';
import { AudioDataService } from '../../services/audio/audio.service';

export class AudioListAction {
  static readonly type = '[Audio] List';
  constructor(public type = 'default', public locale: string) {}
}

export class AudioQueryAction {
  static readonly type = '[Audio] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class AudioSearchAction {
  static readonly type = '[Audio] Search';
  constructor(
    public searchId: string,
    public query: string,
    public limit?: number,
    public context?: string | DatabaseDataSearchingIndexData
  ) {}
}

export class AudioSearchMoreAction {
  static readonly type = '[Audio] Search load more';
  constructor(public searchId: string, public page: number) {}
}

export class AudioItemAction {
  static readonly type = '[Audio] Item';
  constructor(public id: string) {}
}

export interface AudioStateSearchListItem {
  query: string;
  result: DatabaseDataSearchResult<Audio>;
  items: Audio[];
}


export interface AudioStateModel {
  defaultList: Record<string, Audio[]>;
  queryList: Record<string, Audio[]>;
  searchList: Record<string, AudioStateSearchListItem>;
  itemRecord: Record<string, Audio>;
}

@State<AudioStateModel>({
  name: 'schemata_audio',
  defaults: {
    defaultList: {},
    queryList: {},
    searchList: {},
    itemRecord: {},
  },
})
@Injectable()
export class AudioState {

  constructor(private dataService: AudioDataService) {}

  @Action(AudioListAction)
  audioList({getState, patchState}: StateContext<AudioStateModel>, action: AudioListAction) {
    const {defaultList: currentDefaultList} = getState();
    const {type, locale} = action;
    const listId = `${type}:${locale}`;
    if (currentDefaultList?.[listId]?.length) {
      return of(currentDefaultList[listId]);
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
            defaultList: {
              ...currentDefaultList,
              [listId]: items,
            },
          })
        ),
      );
  }

  @Action(AudioQueryAction)
  audioQuery({getState, patchState}: StateContext<AudioStateModel>, action: AudioQueryAction) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId]?.length) {
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

  @Action(AudioSearchAction)
  audioSearch({getState, patchState}: StateContext<AudioStateModel>, action: AudioSearchAction) {
    const {searchList: currentSearchList} = getState();
    const {searchId, query, limit, context} = action;
    if (currentSearchList?.[searchId] && currentSearchList?.[searchId]?.query === query) {
      return of(currentSearchList[searchId]);
    }
    const result = this.dataService.search(query, limit, context);
    return result.list()
      .pipe(
        tap(items =>
          patchState({
            searchList: {
              ...currentSearchList,
              [searchId]: { query, result, items },
            },
          })
        ),
      );
  }

  @Action(AudioSearchMoreAction)
  audioSearchMore({getState, patchState}: StateContext<AudioStateModel>, action: AudioSearchMoreAction) {
    const {searchList: currentSearchList} = getState();
    const {searchId, page} = action;
    const currentSearchItem = currentSearchList?.[searchId];
    if (!currentSearchItem) {
      return of(false);
    }
    const {result, query, items: currentItems} = currentSearchItem;
    return result.list(page)
      .pipe(
        tap(items =>
          patchState({
            searchList: {
              ...currentSearchList,
              [searchId]: {
                query,
                result,
                items: [...currentItems, ...items],
              },
            },
          })
        ),
      );
  }

  @Action(AudioItemAction)
  audioItem({getState, patchState}: StateContext<AudioStateModel>, action: AudioItemAction) {
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
