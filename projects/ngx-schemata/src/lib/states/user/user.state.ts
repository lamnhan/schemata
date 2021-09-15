import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '@lamnhan/schemata';
import { UserDataService } from '../../services/user/user.service';

export interface UserStateModel {
  itemRecord: Record<string, User>;
}

export class UserItem {
  static readonly type = '[User] Item';
  constructor(public id: string) {}
}

@State<UserStateModel>({
  name: 'schemata_user',
  defaults: {
    itemRecord: {},
  },
})
@Injectable()
export class UserState {

  constructor(private dataService: UserDataService) {}

  @Action(UserItem)
  tagItem({getState, patchState}: StateContext<UserStateModel>, action: UserItem) {
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
