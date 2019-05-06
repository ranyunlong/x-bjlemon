import { xSystemActionTypes, XSystemAction, TabPane } from "./action";

const initState: XSystemState = {
    panes: [
        {
            title: '欢迎',
            url: '/x/welcome.shtml',
            closable: false,
            id: undefined,
            pId: undefined
        }
    ],
    activePane: '/x/welcome.shtml'
}

export function xSystemReducer(state = initState, action: XSystemAction) {
    switch (action.type) {
        case xSystemActionTypes.SET_PANES:
        return {
            ...state,
            panes: action.panes,
            activePane: action.activePane
        }
        default:
        return state;
    }
}

export interface XSystemState {
    panes: TabPane[];
    activePane: string;
}