import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from '@lamnhan/schemata';
import { PostDataService } from '../../services/post/post.service';

export interface PostStateModel {
  locale: string;
  defaultList: Record<string, Post[]>;
  queryList: Record<string, Post[]>;
  itemRecord: Record<string, Post>;
}

export class PostList {
  static readonly type = '[Post] List';
  constructor(public type = 'default', public locale: string) {}
}

export class PostQuery {
  static readonly type = '[Post] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class PostItem {
  static readonly type = '[Post] Item';
  constructor(public id: string) {}
}

@State<PostStateModel>({
  name: 'post',
  defaults: {
    locale: '',
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class PostState {

  constructor(private dataService: PostDataService) {}

  @Action(PostList)
  postList({getState, patchState}: StateContext<PostStateModel>, action: PostList) {
    const {locale: currentLocale, defaultList: currentDefaultList} = getState();
    const {type, locale} = action;
    if (currentLocale === locale && currentDefaultList?.[type].length) {
      return of(currentDefaultList[type]);
    }
    return this.dataService
      .getCollection(
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
            locale,
            defaultList: {
              ...currentDefaultList,
              [type]: items,
            },
          })
        ),
      );
  }

  @Action(PostQuery)
  postQuery({getState, patchState}: StateContext<PostStateModel>, action: PostQuery) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId].length) {
      return of(currentQueryList[queryId]);
    }
    return this.dataService
      .getCollection(queryFn, {name: `[Post] ${queryId}`})
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

  @Action(PostItem)
  postItem({getState, patchState}: StateContext<PostStateModel>, action: PostItem) {
    const {itemRecord: currentItemRecord} = getState();
    const {id} = action;
    if (currentItemRecord[id]) {      
      return of(currentItemRecord[id]);
    }
    return this.dataService
      .getDoc(id)
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
