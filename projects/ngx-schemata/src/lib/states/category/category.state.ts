import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/compat/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Category } from '@lamnhan/schemata';
import { CategoryDataService } from '../../services/category/category.service';

export interface CategoryStateModel {
  locale: string;
  defaultList: Record<string, Category[]>;
  queryList: Record<string, Category[]>;
  itemRecord: Record<string, Category>;
}

export class CategoryList {
  static readonly type = '[Category] List';
  constructor(public type = 'default', public locale: string) {}
}

export class CategoryQuery {
  static readonly type = '[Category] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class CategoryItem {
  static readonly type = '[Category] Item';
  constructor(public id: string) {}
}

@State<CategoryStateModel>({
  name: 'schemata_category',
  defaults: {
    locale: '',
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class CategoryState {

  constructor(private dataService: CategoryDataService) {}

  @Action(CategoryList)
  categoryList({getState, patchState}: StateContext<CategoryStateModel>, action: CategoryList) {
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
        { name: `[Category] status=publish type=${type} locale=${locale} createdAt=desc` }
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

  @Action(CategoryQuery)
  categoryQuery({getState, patchState}: StateContext<CategoryStateModel>, action: CategoryQuery) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId].length) {
      return of(currentQueryList[queryId]);
    }
    return this.dataService
      .list(queryFn, {name: `[Category] ${queryId}`})
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

  @Action(CategoryItem)
  categoryItem({getState, patchState}: StateContext<CategoryStateModel>, action: CategoryItem) {
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
