import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/compat/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Category } from '@lamnhan/schemata';
import { CategoryDataService } from '../../services/category/category.service';

export class CategoryListAction {
  static readonly type = '[Category] List';
  constructor(public type = 'default', public locale: string) {}
}

export class CategoryQueryAction {
  static readonly type = '[Category] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class CategoryItemAction {
  static readonly type = '[Category] Item';
  constructor(public id: string) {}
}

export interface CategoryStateModel {
  defaultList: Record<string, Category[]>;
  queryList: Record<string, Category[]>;
  itemRecord: Record<string, Category>;
}

@State<CategoryStateModel>({
  name: 'schemata_category',
  defaults: {
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class CategoryState {

  constructor(private dataService: CategoryDataService) {}

  @Action(CategoryListAction)
  categoryList({getState, patchState}: StateContext<CategoryStateModel>, action: CategoryListAction) {
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
        { name: `[Category] status=publish type=${type} locale=${locale} createdAt=desc` }
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

  @Action(CategoryQueryAction)
  categoryQuery({getState, patchState}: StateContext<CategoryStateModel>, action: CategoryQueryAction) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId]?.length) {
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

  @Action(CategoryItemAction)
  categoryItem({getState, patchState}: StateContext<CategoryStateModel>, action: CategoryItemAction) {
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
