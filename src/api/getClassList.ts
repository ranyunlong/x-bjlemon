import { http } from "./base";


/**
 * 获取班级列表
 * @param params 
 */
export function getClassList(params: QueryClassParams) {
    return http.post<ClassListData>('/class/query.action', params);
}

export interface QueryClassParams {
    // 讲师id
    teaId: number;
    // 讲师名称
    teacher?: string;
    // 页码
    page?: number;
    // 查询条数
    rows?: number;
    // 阶段id
    stageId?: number;
}

export interface ClassListData {
  total: number;
  rows: ClassInfo[];
}

export interface ClassInfo {
  classId: number;
  stageId: number;
  teaId: number;
  startTime: string;
  endTime: string;
  teacher: string;
  classStatus: string;
  className: string;
  stageName: string;
  zjName: string;
}