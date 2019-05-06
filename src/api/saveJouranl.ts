import { http } from "./base";

/**
 * 保存教学日志
 * @param data 
 */
export function saveJouranl(data: SaveJouranlParams) {
    return http.post<SaveJouranlData>('/journal/saveJouran.action', data)
}

export interface SaveJouranlParams {
    jouCode: string | number | undefined;
    skName: string | undefined;
    skTime: string | undefined;
    skPlan: string | undefined;
    editorValue: string | undefined;
}

export interface SaveJouranlData {
    msg: string;
    success: boolean;
}