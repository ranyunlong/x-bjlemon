import { http } from "./base";

/**
 * 获取讲师列表
 */
export function getLecturerList() {
    return http.post<LecturerInfo[]>('/basedata/loadByName.action', {
        dataName: '任课教师'
    })
}

export interface LecturerInfo{
  id: number;
  dataName: string;
  dataValue: string;
  dataText: string;
  dataGroup: string;
}