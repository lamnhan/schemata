import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/compat/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Post } from '@lamnhan/schemata';
import { PostDataService } from '../../services/post/post.service';

export class PostListAction {
  static readonly type = '[Post] List';
  constructor(public type = 'default', public locale: string) {}
}

export class PostQueryAction {
  static readonly type = '[Post] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class PostItemAction {
  static readonly type = '[Post] Item';
  constructor(public id: string) {}
}

export interface PostStateModel {
  locale: string;
  defaultList: Record<string, Post[]>;
  queryList: Record<string, Post[]>;
  itemRecord: Record<string, Post>;
}

@State<PostStateModel>({
  name: 'schemata_post',
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

  @Action(PostListAction)
  postList({getState, patchState}: StateContext<PostStateModel>, action: PostListAction) {
    const {locale: currentLocale, defaultList: currentDefaultList} = getState();
    const {type, locale} = action;
    if (currentLocale === locale && currentDefaultList?.[type]?.length) {
      return of(currentDefaultList[type]);
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
            locale,
            defaultList: {
              ...currentDefaultList,
              [type]: items,
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
