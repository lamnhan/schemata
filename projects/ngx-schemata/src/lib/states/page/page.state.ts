import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Page } from '@lamnhan/schemata';
import { PageDataService } from '../../services/page/page.service';

export interface PageStateModel {
  locale: string;
  defaultList: Record<string, Page[]>;
  queryList: Record<string, Page[]>;
  itemRecord: Record<string, Page>;
}

export class PageList {
  static readonly type = '[Page] List';
  constructor(public type = 'default', public locale: string) {}
}

export class PageQuery {
  static readonly type = '[Page] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class PageItem {
  static readonly type = '[Page] Item';
  constructor(public id: string) {}
}

@State<PageStateModel>({
  name: 'page',
  defaults: {
    locale: '',
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class PageState {

  constructor(private dataService: PageDataService) {}

  @Action(PageList)
  pageList({getState, patchState}: StateContext<PageStateModel>, action: PageList) {
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
        { name: `[Page] status=publish type=${type} locale=${locale} createdAt=desc` }
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

  @Action(PageQuery)
  pageQuery({getState, patchState}: StateContext<PageStateModel>, action: PageQuery) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId].length) {
      return of(currentQueryList[queryId]);
    }
    return this.dataService
      .getCollection(queryFn, {name: `[Page] ${queryId}`})
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

  @Action(PageItem)
  pageItem({getState, patchState}: StateContext<PageStateModel>, action: PageItem) {
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
