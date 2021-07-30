import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Meta } from '@lamnhan/schemata';
import { MetaDataService } from '../../services/meta/meta.service';

export interface MetaStateModel {
  defaultList: Record<string, Meta[]>;
  queryList: Record<string, Meta[]>;
  itemRecord: Record<string, Meta>;
}

export class MetaList {
  static readonly type = '[Meta] List';
  constructor(public type = 'default') {}
}

export class MetaQuery {
  static readonly type = '[Meta] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class MetaItem {
  static readonly type = '[Meta] Item';
  constructor(public id: string) {}
}

@State<MetaStateModel>({
  name: 'meta',
  defaults: {
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class MetaState {

  constructor(private dataService: MetaDataService) {}

  @Action(MetaList)
  metaList({getState, patchState}: StateContext<MetaStateModel>, action: MetaList) {
    const {defaultList: currentDefaultList} = getState();
    const {type} = action;
    if (currentDefaultList?.[type].length) {
      return of(currentDefaultList[type]);
    }
    return this.dataService
      .getCollection(
        ref => ref
          .where('status', '==', 'publish')
          .where('type', '==', type)
          .orderBy('createdAt', 'desc'),
        { name: `[Meta] status=publish type=${type} createdAt=desc` }
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

  @Action(MetaQuery)
  metaQuery({getState, patchState}: StateContext<MetaStateModel>, action: MetaQuery) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId].length) {
      return of(currentQueryList[queryId]);
    }
    return this.dataService
      .getCollection(queryFn, {name: `[Meta] ${queryId}`})
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

  @Action(MetaItem)
  metaItem({getState, patchState}: StateContext<MetaStateModel>, action: MetaItem) {
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
