import { Injectable } from '@angular/core';
import { QueryFn } from '@angular/fire/firestore';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Profile } from '@lamnhan/schemata';
import { ProfileDataService } from '../../services/profile/profile.service';

export interface ProfileStateModel {
  defaultList: Record<string, Profile[]>;
  queryList: Record<string, Profile[]>;
  itemRecord: Record<string, Profile>;
}

export class ProfileList {
  static readonly type = '[Profile] List';
  constructor(public type = 'default') {}
}

export class ProfileQuery {
  static readonly type = '[Profile] Query';
  constructor(public queryId: string, public queryFn: QueryFn) {}
}

export class ProfileItem {
  static readonly type = '[Profile] Item';
  constructor(public id: string) {}
}

@State<ProfileStateModel>({
  name: 'profile',
  defaults: {
    defaultList: {},
    queryList: {},
    itemRecord: {},
  },
})
@Injectable()
export class ProfileState {

  constructor(private dataService: ProfileDataService) {}

  @Action(ProfileList)
  profileList({getState, patchState}: StateContext<ProfileStateModel>, action: ProfileList) {
    const {defaultList: currentDefaultList} = getState();
    const {type} = action;
    if (currentDefaultList?.[type].length) {
      return of(currentDefaultList[type]);
    }
    return this.dataService
      .getCollection(
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

  @Action(ProfileQuery)
  profileQuery({getState, patchState}: StateContext<ProfileStateModel>, action: ProfileQuery) {
    const {queryList: currentQueryList} = getState();
    const {queryId, queryFn} = action;
    if (currentQueryList?.[queryId].length) {
      return of(currentQueryList[queryId]);
    }
    return this.dataService
      .getCollection(queryFn, {name: `[Profile] ${queryId}`})
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

  @Action(ProfileItem)
  profileItem({getState, patchState}: StateContext<ProfileStateModel>, action: ProfileItem) {
    const {itemRecord: currentItemRecord} = getState();
    const {id} = action;
    if (currentItemRecord[id]) {      
      return of(currentItemRecord[id]);
    }
    return this.dataService
      .getDoc(id)
      .pipe(
        tap(item =>
          patchState({
            itemRecord: {
              ...currentItemRecord,
              [id]: item,
            },
          })
        ),
      );
  }
}
