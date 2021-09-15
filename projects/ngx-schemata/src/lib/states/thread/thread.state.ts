import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/compat/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Thread } from '@lamnhan/schemata';
import { ThreadDataService } from '../../services/thread/thread.service';

export interface ThreadStateModel {
  defaultList: Record<string, Thread[]>;
  queryList: Record<string, Thread[]>;
  itemRecord: Record<string, Thread>;
}

export class ThreadList {
  static readonly type = '[Thread] List';
  constructor(public type = 'default') {}
}

export class ThreadQuery {
  static readonly type = '[Thread] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class ThreadItem {
  static readonly type = '[Thread] Item';
  constructor(public id: string) {}
}

@State<ThreadStateModel>({
  name: 'schemata_thread',
  defaults: {
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class ThreadState {

  constructor(private dataService: ThreadDataService) {}

  @Action(ThreadList)
  threadList({getState, patchState}: StateContext<ThreadStateModel>, action: ThreadList) {
    const {defaultList: currentDefaultList} = getState();
    const {type} = action;
    if (currentDefaultList?.[type].length) {
      return of(currentDefaultList[type]);
    }
    return this.dataService
      .list(
        ref => ref
          .where('status', '==', 'publish')
          .where('type', '==', type)
          .orderBy('createdAt', 'desc'),
        { name: `[Thread] status=publish type=${type} createdAt=desc` }
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

  @Action(ThreadQuery)
  threadQuery({getState, patchState}: StateContext<ThreadStateModel>, action: ThreadQuery) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId].length) {
      return of(currentQueryList[queryId]);
    }
    return this.dataService
      .list(queryFn, {name: `[Thread] ${queryId}`})
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

  @Action(ThreadItem)
  threadItem({getState, patchState}: StateContext<ThreadStateModel>, action: ThreadItem) {
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
