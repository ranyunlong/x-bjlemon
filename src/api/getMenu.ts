/**
 * 获取用户菜单
 */

import { http } from "./base";

export function getUserMenu() {
    return http.get('/login/loadUserMenus.action')
}