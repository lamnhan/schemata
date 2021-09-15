import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/compat/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Meta } from '@lamnhan/schemata';
import { MetaDataService } from '../../services/meta/meta.service';

export class MetaListAction {
  static readonly type = '[Meta] List';
  constructor(public type = 'default') {}
}

export class MetaQueryAction {
  static readonly type = '[Meta] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class MetaItemAction {
  static readonly type = '[Meta] Item';
  constructor(public id: string) {}
}

export interface MetaStateModel {
  defaultList: Record<string, Meta[]>;
  queryList: Record<string, Meta[]>;
  itemRecord: Record<string, Meta>;
}

@State<MetaStateModel>({
  name: 'schemata_meta',
  defaults: {
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class MetaState {

  constructor(private dataService: MetaDataService) {}

  @Action(MetaListAction)
  metaList({getState, patchState}: StateContext<MetaStateModel>, action: MetaListAction) {
    const {defaultList: currentDefaultList} = getState();
    const {type} = action;
    if (currentDefaultList?.[type]?.length) {
      return of(currentDefaultList[type]);
    }
    return this.dataService
      .list(
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

  @Action(MetaQueryAction)
  metaQuery({getState, patchState}: StateContext<MetaStateModel>, action: MetaQueryAction) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId]?.length) {
      return of(currentQueryList[queryId]);
    }
    return this.dataService
      .list(queryFn, {name: `[Meta] ${queryId}`})
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

  @Action(MetaItemAction)
  metaItem({getState, patchState}: StateContext<MetaStateModel>, action: MetaItemAction) {
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
