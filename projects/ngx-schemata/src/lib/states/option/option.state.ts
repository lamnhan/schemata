import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/compat/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Option } from '@lamnhan/schemata';
import { OptionDataService } from '../../services/option/option.service';

export class OptionListAction {
  static readonly type = '[Option] List';
  constructor(public type = 'default') {}
}

export class OptionQueryAction {
  static readonly type = '[Option] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class OptionItemAction {
  static readonly type = '[Option] Item';
  constructor(public id: string) {}
}

export interface OptionStateModel {
  defaultList: Record<string, Option[]>;
  queryList: Record<string, Option[]>;
  itemRecord: Record<string, Option>;
}

@State<OptionStateModel>({
  name: 'schemata_option',
  defaults: {
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class OptionState {

  constructor(private dataService: OptionDataService) {}

  @Action(OptionListAction)
  optionList({getState, patchState}: StateContext<OptionStateModel>, action: OptionListAction) {
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
        { name: `[Option] status=publish type=${type} createdAt=desc` }
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

  @Action(OptionQueryAction)
  optionQuery({getState, patchState}: StateContext<OptionStateModel>, action: OptionQueryAction) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId]?.length) {
      return of(currentQueryList[queryId]);
    }
    return this.dataService
      .list(queryFn, {name: `[Option] ${queryId}`})
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

  @Action(OptionItemAction)
  optionItem({getState, patchState}: StateContext<OptionStateModel>, action: OptionItemAction) {
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
