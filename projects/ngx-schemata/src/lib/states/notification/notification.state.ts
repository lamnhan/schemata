import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/compat/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Notification } from '@lamnhan/schemata';
import { NotificationDataService } from '../../services/notification/notification.service';

export class NotificationListAction {
  static readonly type = '[Notification] List';
  constructor(public type = 'default', public locale: string) {}
}

export class NotificationQueryAction {
  static readonly type = '[Notification] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class NotificationItemAction {
  static readonly type = '[Notification] Item';
  constructor(public id: string) {}
}

export interface NotificationStateModel {
  defaultList: Record<string, Notification[]>;
  queryList: Record<string, Notification[]>;
  itemRecord: Record<string, Notification>;
}

@State<NotificationStateModel>({
  name: 'schemata_notification',
  defaults: {
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class NotificationState {

  constructor(private dataService: NotificationDataService) {}

  @Action(NotificationListAction)
  notificationList({getState, patchState}: StateContext<NotificationStateModel>, action: NotificationListAction) {
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
        { name: `[Notification] status=publish type=${type} locale=${locale} createdAt=desc` }
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

  @Action(NotificationQueryAction)
  notificationQuery({getState, patchState}: StateContext<NotificationStateModel>, action: NotificationQueryAction) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId]?.length) {
      return of(currentQueryList[queryId]);
    }
    return this.dataService
      .list(queryFn, {name: `[Notification] ${queryId}`})
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

  @Action(NotificationItemAction)
  notificationItem({getState, patchState}: StateContext<NotificationStateModel>, action: NotificationItemAction) {
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
