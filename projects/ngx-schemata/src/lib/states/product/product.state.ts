import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/compat/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Product } from '@lamnhan/schemata';
import { ProductDataService } from '../../services/product/product.service';

export class ProductListAction {
  static readonly type = '[Product] List';
  constructor(public type = 'default', public locale: string) {}
}

export class ProductQueryAction {
  static readonly type = '[Product] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class ProductItemAction {
  static readonly type = '[Product] Item';
  constructor(public id: string) {}
}

export interface ProductStateModel {
  defaultList: Record<string, Product[]>;
  queryList: Record<string, Product[]>;
  itemRecord: Record<string, Product>;
}

@State<ProductStateModel>({
  name: 'schemata_product',
  defaults: {
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class ProductState {

  constructor(private dataService: ProductDataService) {}

  @Action(ProductListAction)
  productList({getState, patchState}: StateContext<ProductStateModel>, action: ProductListAction) {
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
        { name: `[Product] status=publish type=${type} locale=${locale} createdAt=desc` }
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

  @Action(ProductQueryAction)
  productQuery({getState, patchState}: StateContext<ProductStateModel>, action: ProductQueryAction) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId]?.length) {
      return of(currentQueryList[queryId]);
    }
    return this.dataService
      .list(queryFn, {name: `[Product] ${queryId}`})
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

  @Action(ProductItemAction)
  productItem({getState, patchState}: StateContext<ProductStateModel>, action: ProductItemAction) {
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
