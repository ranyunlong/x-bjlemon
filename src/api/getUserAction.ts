import { http } from "./base";

export function getUserAction() {
    return http.get<UserAction>('/api/open/getLoginUser.action')
}


interface UserAction {
    state: string;
    user: UserAccess;
  }
  
  export interface UserAccess {
    teaPass: string;
    teaCode: string;
    sSOId: number;
    teaId: number;
    teaMail: string;
    roleId: number;
    teaName: string;
  }