import { MenuInfo } from "../api/getMenu";

export function deepMenu(pId: number | null, originMenu: MenuInfo[] | MenuInfoChange[]) {
    return originMenu
        .filter(item => item.pId === pId)
        .map((item: MenuInfoChange) => {
            item.children = deepMenu(item.id, originMenu)
            return item;
        });
}

export interface MenuInfoChange extends MenuInfo {
    children?: MenuInfoChange[];
}