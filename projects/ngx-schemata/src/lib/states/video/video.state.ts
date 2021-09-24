import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/compat/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Video } from '@lamnhan/schemata';
import { DatabaseDataSearchingIndexData, DatabaseDataSearchResult } from '@lamnhan/ngx-useful';
import { VideoDataService } from '../../services/video/video.service';

export class VideoListAction {
  static readonly type = '[Video] List';
  constructor(public type = 'default', public locale: string) {}
}

export class VideoQueryAction {
  static readonly type = '[Video] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class VideoSearchAction {
  static readonly type = '[Video] Search';
  constructor(
    public searchId: string,
    public query: string,
    public limit?: number,
    public context?: string | DatabaseDataSearchingIndexData
  ) {}
}

export class VideoSearchMoreAction {
  static readonly type = '[Video] Search load more';
  constructor(public searchId: string, public page: number) {}
}

export class VideoItemAction {
  static readonly type = '[Video] Item';
  constructor(public id: string) {}
}

export interface VideoStateSearchListItem {
  query: string;
  result: DatabaseDataSearchResult<Video>;
  items: Video[];
}

export interface VideoStateModel {
  defaultList: Record<string, Video[]>;
  queryList: Record<string, Video[]>;
  searchList: Record<string, VideoStateSearchListItem>;
  itemRecord: Record<string, Video>;
}

@State<VideoStateModel>({
  name: 'schemata_video',
  defaults: {
    defaultList: {},
    queryList: {},
    searchList: {},
    itemRecord: {},
  },
})
@Injectable()
export class VideoState {

  constructor(private dataService: VideoDataService) {}

  @Action(VideoListAction)
  videoList({getState, patchState}: StateContext<VideoStateModel>, action: VideoListAction) {
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
        { name: `[Video] status=publish type=${type} locale=${locale} createdAt=desc` }
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

  @Action(VideoQueryAction)
  videoQuery({getState, patchState}: StateContext<VideoStateModel>, action: VideoQueryAction) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId]?.length) {
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
  
  @Action(VideoSearchAction)
  videoSearch({getState, patchState}: StateContext<VideoStateModel>, action: VideoSearchAction) {
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

  @Action(VideoSearchMoreAction)
  videoSearchMore({getState, patchState}: StateContext<VideoStateModel>, action: VideoSearchMoreAction) {
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

  @Action(VideoItemAction)
  videoItem({getState, patchState}: StateContext<VideoStateModel>, action: VideoItemAction) {
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
