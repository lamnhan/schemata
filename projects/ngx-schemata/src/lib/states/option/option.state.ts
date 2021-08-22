import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Option } from '@lamnhan/schemata';
import { OptionDataService } from '../../services/option/option.service';

export interface OptionStateModel {
  defaultList: Record<string, Option[]>;
  queryList: Record<string, Option[]>;
  itemRecord: Record<string, Option>;
}

export class OptionList {
  static readonly type = '[Option] List';
  constructor(public type = 'default') {}
}

export class OptionQuery {
  static readonly type = '[Option] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class OptionItem {
  static readonly type = '[Option] Item';
  constructor(public id: string) {}
}

@State<OptionStateModel>({
  name: 'option',
  defaults: {
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class OptionState {

  constructor(private dataService: OptionDataService) {}

  @Action(OptionList)
  optionList({getState, patchState}: StateContext<OptionStateModel>, action: OptionList) {
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

  @Action(OptionQuery)
  optionQuery({getState, patchState}: StateContext<OptionStateModel>, action: OptionQuery) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId].length) {
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

  @Action(OptionItem)
  optionItem({getState, patchState}: StateContext<OptionStateModel>, action: OptionItem) {
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
