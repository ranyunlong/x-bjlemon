import { center } from "./base";
import { UserState } from "../store/reducers/user";

/**
 * 手机号码登录
 */
export function phoneLogin(params: PhoneLoginParams) {
    return center.get('/', {
        params
    })
}

/**
 * 账号登录
 */
export function accountLogin(data: AccoundLoginParams) {
    return center.post<{[K in keyof UserState]: UserState[K]}>('/doLogin', {
        ...data,
        redirect_url: ''
    })
}

export interface AccoundLoginParams {
    account: string;
    password: string;
}

export interface PhoneLoginParams {
    phone: string;
    code: string;
}