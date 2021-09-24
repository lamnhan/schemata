import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/compat/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from '@lamnhan/schemata';
import { DatabaseDataSearchingIndexData, DatabaseDataSearchResult } from '@lamnhan/ngx-useful';
import { PostDataService } from '../../services/post/post.service';

export class PostListAction {
  static readonly type = '[Post] List';
  constructor(public type = 'default', public locale: string) {}
}

export class PostQueryAction {
  static readonly type = '[Post] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class PostSearchAction {
  static readonly type = '[Post] Search';
  constructor(
    public searchId: string,
    public query: string,
    public limit?: number,
    public context?: string | DatabaseDataSearchingIndexData
  ) {}
}

export class PostSearchMoreAction {
  static readonly type = '[Post] Search load more';
  constructor(public searchId: string, public page: number) {}
}

export class PostItemAction {
  static readonly type = '[Post] Item';
  constructor(public id: string) {}
}

export interface PostStateSearchListItem {
  query: string;
  result: DatabaseDataSearchResult<Post>;
  items: Post[];
}

export interface PostStateModel {
  defaultList: Record<string, Post[]>;
  queryList: Record<string, Post[]>;
  searchList: Record<string, PostStateSearchListItem>;
  itemRecord: Record<string, Post>;
}

@State<PostStateModel>({
  name: 'schemata_post',
  defaults: {
    defaultList: {},
    queryList: {},
    searchList: {},
    itemRecord: {},
  },
})
@Injectable()
export class PostState {

  constructor(private dataService: PostDataService) {}

  @Action(PostListAction)
  postList({getState, patchState}: StateContext<PostStateModel>, action: PostListAction) {
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
        { name: `[Post] status=publish type=${type} locale=${locale} createdAt=desc` }
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

  @Action(PostQueryAction)
  postQuery({getState, patchState}: StateContext<PostStateModel>, action: PostQueryAction) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId]?.length) {
      return of(currentQueryList[queryId]);
    }
    return this.dataService
      .list(queryFn, {name: `[Post] ${queryId}`})
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

  @Action(PostSearchAction)
  postSearch({getState, patchState}: StateContext<PostStateModel>, action: PostSearchAction) {
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

  @Action(PostSearchMoreAction)
  postSearchMore({getState, patchState}: StateContext<PostStateModel>, action: PostSearchMoreAction) {
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

  @Action(PostItemAction)
  postItem({getState, patchState}: StateContext<PostStateModel>, action: PostItemAction) {
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
