import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Video } from '@lamnhan/schemata';
import { VideoDataService } from '../../services/video/video.service';

export interface VideoStateModel {
  locale: string;
  defaultList: Record<string, Video[]>;
  queryList: Record<string, Video[]>;
  itemRecord: Record<string, Video>;
}

export class VideoList {
  static readonly type = '[Video] List';
  constructor(public type = 'default', public locale: string) {}
}

export class VideoQuery {
  static readonly type = '[Video] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class VideoItem {
  static readonly type = '[Video] Item';
  constructor(public id: string) {}
}

@State<VideoStateModel>({
  name: 'video',
  defaults: {
    locale: '',
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class VideoState {

  constructor(private dataService: VideoDataService) {}

  @Action(VideoList)
  videoList({getState, patchState}: StateContext<VideoStateModel>, action: VideoList) {
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
        { name: `[Video] status=publish type=${type} locale=${locale} createdAt=desc` }
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

  @Action(VideoQuery)
  videoQuery({getState, patchState}: StateContext<VideoStateModel>, action: VideoQuery) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId].length) {
      return of(currentQueryList[queryId]);
    }
    return this.dataService
      .list(queryFn, {name: `[Video] ${queryId}`})
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

  @Action(VideoItem)
  videoItem({getState, patchState}: StateContext<VideoStateModel>, action: VideoItem) {
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
