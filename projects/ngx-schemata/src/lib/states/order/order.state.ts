import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/compat/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Order } from '@lamnhan/schemata';
import { OrderDataService } from '../../services/order/order.service';

export class OrderListAction {
  static readonly type = '[Order] List';
  constructor(public type = 'default') {}
}

export class OrderQueryAction {
  static readonly type = '[Order] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class OrderItemAction {
  static readonly type = '[Order] Item';
  constructor(public id: string) {}
}

export interface OrderStateModel {
  defaultList: Record<string, Order[]>;
  queryList: Record<string, Order[]>;
  itemRecord: Record<string, Order>;
}

@State<OrderStateModel>({
  name: 'schemata_order',
  defaults: {
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class OrderState {

  constructor(private dataService: OrderDataService) {}

  @Action(OrderListAction)
  orderList({getState, patchState}: StateContext<OrderStateModel>, action: OrderListAction) {
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

  @Action(OrderQueryAction)
  orderQuery({getState, patchState}: StateContext<OrderStateModel>, action: OrderQueryAction) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId]?.length) {
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

  @Action(OrderItemAction)
  orderItem({getState, patchState}: StateContext<OrderStateModel>, action: OrderItemAction) {
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
