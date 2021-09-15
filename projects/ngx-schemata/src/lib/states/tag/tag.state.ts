import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/compat/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Tag } from '@lamnhan/schemata';
import { TagDataService } from '../../services/tag/tag.service';

export class TagListAction {
  static readonly type = '[Tag] List';
  constructor() {}
}

export class TagQueryAction {
  static readonly type = '[Tag] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class TagItemAction {
  static readonly type = '[Tag] Item';
  constructor(public id: string) {}
}

export interface TagStateModel {
  defaultList: Record<string, Tag[]>;
  queryList: Record<string, Tag[]>;
  itemRecord: Record<string, Tag>;
}

@State<TagStateModel>({
  name: 'schemata_tag',
  defaults: {
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class TagState {

  constructor(private dataService: TagDataService) {}

  @Action(TagListAction)
  tagList({getState, patchState}: StateContext<TagStateModel>) {
    const {defaultList: currentDefaultList} = getState();
    const type = 'default';
    if (currentDefaultList?.[type]?.length) {
      return of(currentDefaultList[type]);
    }
    return this.dataService
      .list(
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

  @Action(TagQueryAction)
  tagQuery({getState, patchState}: StateContext<TagStateModel>, action: TagQueryAction) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId]?.length) {
      return of(currentQueryList[queryId]);
    }
    return this.dataService
      .list(queryFn, {name: `[Tag] ${queryId}`})
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

  @Action(TagItemAction)
  tagItem({getState, patchState}: StateContext<TagStateModel>, action: TagItemAction) {
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
