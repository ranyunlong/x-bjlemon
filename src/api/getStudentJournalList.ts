import { http } from "./base";

export function getStudentJournalList(params: QueryStudentJournalInfoListParams) {
    if (!params.stuId) params.stuId = -1;
    if (typeof params.junCode !== 'number') {
        params.junCode = Number(params.junCode)
    }
    return http.post<StudentJournalInfo[]>('/journal/queryByCode.action', params)
}


export interface QueryStudentJournalInfoListParams {
    junCode: number | string;
    stuId?: number;
}

export interface StudentJournalInfo {
  detId: number;
  jouCode: string;
  stuId: number;
  skFs: string;
  stuName: string;
  phone?: any;
  homeWork: string;
  gradeEvaluation?: any;
  gradePapers?: any;
  remark?: any;
  homeworkCall?: any;
  callRes?: any;
  drKq: string;
  isMail?: any;
}