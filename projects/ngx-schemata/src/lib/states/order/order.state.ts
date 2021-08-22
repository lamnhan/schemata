import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Order } from '@lamnhan/schemata';
import { OrderDataService } from '../../services/order/order.service';

export interface OrderStateModel {
  defaultList: Record<string, Order[]>;
  queryList: Record<string, Order[]>;
  itemRecord: Record<string, Order>;
}

export class OrderList {
  static readonly type = '[Order] List';
  constructor(public type = 'default') {}
}

export class OrderQuery {
  static readonly type = '[Order] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class OrderItem {
  static readonly type = '[Order] Item';
  constructor(public id: string) {}
}

@State<OrderStateModel>({
  name: 'order',
  defaults: {
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class OrderState {

  constructor(private dataService: OrderDataService) {}

  @Action(OrderList)
  orderList({getState, patchState}: StateContext<OrderStateModel>, action: OrderList) {
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
        { name: `[Order] status=publish type=${type} createdAt=desc` }
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

  @Action(OrderQuery)
  orderQuery({getState, patchState}: StateContext<OrderStateModel>, action: OrderQuery) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId].length) {
      return of(currentQueryList[queryId]);
    }
    return this.dataService
      .list(queryFn, {name: `[Order] ${queryId}`})
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

  @Action(OrderItem)
  orderItem({getState, patchState}: StateContext<OrderStateModel>, action: OrderItem) {
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
