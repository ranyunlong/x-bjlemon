import { http } from "./base";

/**
 * 获取课程阶段列表
 */
export function getStageList() {
    return http.post<StageInfo[]>('/stage/loadAll.action')
}


export interface StageInfo {
  stageId: number;
  stageName: string;
  beforStageId?: any;
}