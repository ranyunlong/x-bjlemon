/**
 * 用户个人信息store
 */

import { UserAction, UserActionTypes } from "./action";
import { UserAccess } from "../../../api/getUserAction";

const initState: UserState =  {
    lemon_sso_sessionid: localStorage.getItem('lemon_sso_sessionid') as string
}

export function userReducer(state = initState, action: UserAction) {
    switch (action.type) {
        case UserActionTypes.SET_USER:
        return {
            ...state,
            ...action.user
        }
        case UserActionTypes.SET_USER_ACCESS:
        return {
            ...state,
            ...action.user
        }
        default:
        return state;
    }
}


export interface UserState {
  lemon_sso_sessionid?: string |undefined;
  ssoUser?: UserInfo | undefined;
  access?: UserAccess;
}

export interface UserInfo {
  admin: boolean;
  age: number;
  email: string;
  gmtCreate: number;
  password: string;
  phone: string;
  salt: string;
  sex: number;
  userId: number;
  userName: string;
  valid: boolean;
}