import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/compat/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Notification } from '@lamnhan/schemata';
import { NotificationDataService } from '../../services/notification/notification.service';

export interface NotificationStateModel {
  locale: string;
  defaultList: Record<string, Notification[]>;
  queryList: Record<string, Notification[]>;
  itemRecord: Record<string, Notification>;
}

export class NotificationList {
  static readonly type = '[Notification] List';
  constructor(public type = 'default', public locale: string) {}
}

export class NotificationQuery {
  static readonly type = '[Notification] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class NotificationItem {
  static readonly type = '[Notification] Item';
  constructor(public id: string) {}
}

@State<NotificationStateModel>({
  name: 'notification',
  defaults: {
    locale: '',
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class NotificationState {

  constructor(private dataService: NotificationDataService) {}

  @Action(NotificationList)
  notificationList({getState, patchState}: StateContext<NotificationStateModel>, action: NotificationList) {
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
        { name: `[Notification] status=publish type=${type} locale=${locale} createdAt=desc` }
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

  @Action(NotificationQuery)
  notificationQuery({getState, patchState}: StateContext<NotificationStateModel>, action: NotificationQuery) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId].length) {
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

  @Action(NotificationItem)
  notificationItem({getState, patchState}: StateContext<NotificationStateModel>, action: NotificationItem) {
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
