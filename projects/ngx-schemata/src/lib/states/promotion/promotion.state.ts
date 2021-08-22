import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Promotion } from '@lamnhan/schemata';
import { PromotionDataService } from '../../services/promotion/promotion.service';

export interface PromotionStateModel {
  locale: string;
  defaultList: Record<string, Promotion[]>;
  queryList: Record<string, Promotion[]>;
  itemRecord: Record<string, Promotion>;
}

export class PromotionList {
  static readonly type = '[Promotion] List';
  constructor(public type = 'default', public locale: string) {}
}

export class PromotionQuery {
  static readonly type = '[Promotion] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class PromotionItem {
  static readonly type = '[Promotion] Item';
  constructor(public id: string) {}
}

@State<PromotionStateModel>({
  name: 'promotion',
  defaults: {
    locale: '',
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class PromotionState {

  constructor(private dataService: PromotionDataService) {}

  @Action(PromotionList)
  promotionList({getState, patchState}: StateContext<PromotionStateModel>, action: PromotionList) {
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
        { name: `[Promotion] status=publish type=${type} locale=${locale} createdAt=desc` }
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

  @Action(PromotionQuery)
  promotionQuery({getState, patchState}: StateContext<PromotionStateModel>, action: PromotionQuery) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId].length) {
      return of(currentQueryList[queryId]);
    }
    return this.dataService
      .list(queryFn, {name: `[Promotion] ${queryId}`})
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

  @Action(PromotionItem)
  promotionItem({getState, patchState}: StateContext<PromotionStateModel>, action: PromotionItem) {
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
