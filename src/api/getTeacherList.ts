import { http } from "./base";


/**
 * 获取老师列表
 */
export function getTeacherList() {
    return http.post<TeacherInfo[]>('/teacher/loadAll.action')
}


export interface TeacherInfo {
  teaId: number;
  teaCode?: string;
  teaPass?: string;
  teaName: string;
  roleId: number;
  teaMail?: string;
  ssoid: number;
}