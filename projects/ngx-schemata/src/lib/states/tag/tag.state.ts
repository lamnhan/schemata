import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Tag } from '@lamnhan/schemata';
import { TagDataService } from '../../services/tag/tag.service';

export interface TagStateModel {
  defaultList: Record<string, Tag[]>;
  queryList: Record<string, Tag[]>;
  itemRecord: Record<string, Tag>;
}

export class TagList {
  static readonly type = '[Tag] List';
  constructor() {}
}

export class TagQuery {
  static readonly type = '[Tag] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class TagItem {
  static readonly type = '[Tag] Item';
  constructor(public id: string) {}
}

@State<TagStateModel>({
  name: 'tag',
  defaults: {
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class TagState {

  constructor(private dataService: TagDataService) {}

  @Action(TagList)
  tagList({getState, patchState}: StateContext<TagStateModel>) {
    const {defaultList: currentDefaultList} = getState();
    const type = 'default';
    if (currentDefaultList?.[type].length) {
      return of(currentDefaultList[type]);
    }
    return this.dataService
      .getCollection(
        ref => ref
          .where('status', '==', 'publish')
          .orderBy('createdAt', 'desc'),
        { name: `[Tag] status=publish createdAt=desc` }
      )
      .pipe(
        tap(items =>
          patchState({
            defaultList: {
              ...currentDefaultList,
              [type]: items,
            },
          })
        ),
      );
  }

  @Action(TagQuery)
  tagQuery({getState, patchState}: StateContext<TagStateModel>, action: TagQuery) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId].length) {
      return of(currentQueryList[queryId]);
    }
    return this.dataService
      .getCollection(queryFn, {name: `[Tag] ${queryId}`})
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

  @Action(TagItem)
  tagItem({getState, patchState}: StateContext<TagStateModel>, action: TagItem) {
    const {itemRecord: currentItemRecord} = getState();
    const {id} = action;
    if (currentItemRecord[id]) {      
      return of(currentItemRecord[id]);
    }
    return this.dataService
      .getDoc(id)
      .pipe(
        tap(item =>
          patchState({
            itemRecord: {
              ...currentItemRecord,
              [id]: item,
            },
          })
        ),
      );
  }
}