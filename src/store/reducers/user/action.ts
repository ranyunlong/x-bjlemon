import { UserState } from ".";

export enum UserActionTypes {
    SET_USER = 0,
    SET_USER_AC
}

// 设置用户
export interface SetUserAction {
    readonly type: UserActionTypes.SET_USER;
    readonly user: UserState;
}

// 设置用户权限
export interface SetUserAcAction {
    readonly type: UserActionTypes.SET_USER_AC;
    readonly ac: any;
}

export type UserAction = SetUserAction | SetUserAcAction;