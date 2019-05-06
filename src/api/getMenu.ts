import { http } from "./base";


/**
 * 获取用户菜单列表
 */
export function getUserMenu() {
    return http.get<MenuInfo[]>('/login/loadUserMenus.action')
}

 export interface MenuInfo {
  id: number;
  pId?: number;
  name: string;
  relUrl?: string;
  iconSkin: string;
  num: string;
}