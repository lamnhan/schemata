import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/compat/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Profile } from '@lamnhan/schemata';
import { ProfileDataService } from '../../services/profile/profile.service';

export class ProfileListAction {
  static readonly type = '[Profile] List';
  constructor(public type = 'default') {}
}

export class ProfileQueryAction {
  static readonly type = '[Profile] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class ProfileItemAction {
  static readonly type = '[Profile] Item';
  constructor(public id: string) {}
}

export interface ProfileStateModel {
  defaultList: Record<string, Profile[]>;
  queryList: Record<string, Profile[]>;
  itemRecord: Record<string, Profile>;
}

@State<ProfileStateModel>({
  name: 'schemata_profile',
  defaults: {
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class ProfileState {

  constructor(private dataService: ProfileDataService) {}

  @Action(ProfileListAction)
  profileList({getState, patchState}: StateContext<ProfileStateModel>, action: ProfileListAction) {
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
        { name: `[Profile] status=publish type=${type} createdAt=desc` }
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

  @Action(ProfileQueryAction)
  profileQuery({getState, patchState}: StateContext<ProfileStateModel>, action: ProfileQueryAction) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId]?.length) {
      return of(currentQueryList[queryId]);
    }
    return this.dataService
      .list(queryFn, {name: `[Profile] ${queryId}`})
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

  @Action(ProfileItemAction)
  profileItem({getState, patchState}: StateContext<ProfileStateModel>, action: ProfileItemAction) {
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
