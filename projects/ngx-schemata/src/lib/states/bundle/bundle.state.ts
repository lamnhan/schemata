import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/compat/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Bundle } from '@lamnhan/schemata';
import { BundleDataService } from '../../services/bundle/bundle.service';

export interface BundleStateModel {
  locale: string;
  defaultList: Record<string, Bundle[]>;
  queryList: Record<string, Bundle[]>;
  itemRecord: Record<string, Bundle>;
}

export class BundleList {
  static readonly type = '[Bundle] List';
  constructor(public type = 'default', public locale: string) {}
}

export class BundleQuery {
  static readonly type = '[Bundle] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class BundleItem {
  static readonly type = '[Bundle] Item';
  constructor(public id: string) {}
}

@State<BundleStateModel>({
  name: 'schemata_bundle',
  defaults: {
    locale: '',
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class BundleState {

  constructor(private dataService: BundleDataService) {}

  @Action(BundleList)
  bundleList({getState, patchState}: StateContext<BundleStateModel>, action: BundleList) {
    const {locale: currentLocale, defaultList: currentDefaultList} = getState();
    const {type, locale} = action;
    if (currentLocale === locale && currentDefaultList?.[type].length) {
      return of(currentDefaultList[type]);
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
            locale,
            defaultList: {
              ...currentDefaultList,
              [type]: items,
            },
          })
        ),
      );
  }

  @Action(BundleQuery)
  bundleQuery({getState, patchState}: StateContext<BundleStateModel>, action: BundleQuery) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId].length) {
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

  @Action(BundleItem)
  bundleItem({getState, patchState}: StateContext<BundleStateModel>, action: BundleItem) {
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
