import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/compat/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Bundle } from '@lamnhan/schemata';
import { BundleDataService } from '../../services/bundle/bundle.service';

export class BundleListAction {
  static readonly type = '[Bundle] List';
  constructor(public type = 'default', public locale: string) {}
}

export class BundleQueryAction {
  static readonly type = '[Bundle] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class BundleItemAction {
  static readonly type = '[Bundle] Item';
  constructor(public id: string) {}
}

export interface BundleStateModel {
  defaultList: Record<string, Bundle[]>;
  queryList: Record<string, Bundle[]>;
  itemRecord: Record<string, Bundle>;
}

@State<BundleStateModel>({
  name: 'schemata_bundle',
  defaults: {
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class BundleState {

  constructor(private dataService: BundleDataService) {}

  @Action(BundleListAction)
  bundleList({getState, patchState}: StateContext<BundleStateModel>, action: BundleListAction) {
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
        { name: `[Bundle] status=publish type=${type} locale=${locale} createdAt=desc` }
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

  @Action(BundleQueryAction)
  bundleQuery({getState, patchState}: StateContext<BundleStateModel>, action: BundleQueryAction) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId]?.length) {
      return of(currentQueryList[queryId]);
    }
    return this.dataService
      .list(queryFn, {name: `[Bundle] ${queryId}`})
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

  @Action(BundleItemAction)
  bundleItem({getState, patchState}: StateContext<BundleStateModel>, action: BundleItemAction) {
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
