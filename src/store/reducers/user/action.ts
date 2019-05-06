import { UserState } from ".";
import { accountLogin, AccoundLoginParams } from "../../../api/login";
import { message } from "antd";
import { getUserAction } from "../../../api/getUserAction";

export enum UserActionTypes {
    SET_USER = 'SET_USER',
    SET_USER_ACCESS = 'SET_USER_ACCESS',

}


export class SetUserAccessAction {
    readonly type = UserActionTypes.SET_USER_ACCESS;
    public user: UserState = {}
    public request() {
        return getUserAction();
    }

    public async getAction() {
        const result = await this.request();
        if (result.data.state === 'ok') {
            this.user.access = result.data.user
            return {
                ...this
            }
        } else {
            this.user.access = undefined
            this.user.lemon_sso_sessionid = undefined
            return {
                ...this
            }
        }
        
    }
}

export class LogoutAction {
    readonly type = UserActionTypes.SET_USER;
    public user: UserState = {}
    public async getAction() {
        localStorage.clear();
        this.user.lemon_sso_sessionid = undefined;
        this.user.access = undefined;
        return {
            ...this
        }
    }
}


export class LoginAction {
    readonly type = UserActionTypes.SET_USER;
    public user: UserState | null = null
    public request(params: AccoundLoginParams) {
        return accountLogin(params);
    }

    public async getAciton(params: AccoundLoginParams) {
        const result = await this.request(params);
        const { state, msg, ...datas } = result.data;
        if (state === 'fail') {
            this.user = null;
            message.error(msg)
            return {
                ...this
            }
        } else {
            this.user = datas
            localStorage.setItem('lemon_sso_sessionid', datas.lemon_sso_sessionid as string);
            return {
                ...this
            };
        }
        
    }
}

export type UserAction = LoginAction | SetUserAccessAction;