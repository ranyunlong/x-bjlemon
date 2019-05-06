export enum xSystemActionTypes {
    SET_PANES = 'SET_PANES'
}
export class setPanesAction {
    readonly type = xSystemActionTypes.SET_PANES;
    constructor(
        public panes: TabPane[],
        public activePane: string
    ) {
        this.panes = panes;
    }
    public async getAction() {
        return {
            ...this
        }
    }
}

export type XSystemAction = setPanesAction;

export interface TabPane {
	title: string;
    url: string;
    id?: number;
    pId?: number;
	closable: boolean;
}