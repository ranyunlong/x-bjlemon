import { http } from "./base";

/**
 * 查询学生
 */
export function queryStudent(query: QueryStudentParams = {page: 1, rows: 10}) {
    return http.post<QueryStudentResponse>('/student/query.action', query)
}

export interface QueryStudentParams {
    page: number;
    rows: number;
    stuName?: string;
    stuQq?: string; 
    stuPhone?: string;
    queryStageId?: string;
    queryClassId?: string;
    queryZjId?: string;
    type?: string;
}

export interface QueryStudentResponse {
  total: number;
  rows: StudentInfo[];
}

export interface StudentInfo {
  stuId: number;
  stuClass: string;
  stuName: string;
  stuQq: string;
  stuPhone: string;
  stuEmail?: string;
  stuMk?: string;
  ssoId?: any;
  type: number;
  stuStatus: string;
  jfjl: string;
  queryZjId?: any;
  queryClassId?: any;
  queryStageId?: any;
  nowClassSkfs?: any;
  nowStageZbcs?: any;
  nowStageXxcs: number;
  stopMessage: string[];
  nowStuCom?: any;
  stuGrade?: any;
  stuFbjg?: any;
  classInfos: any[];
  sysLogs: any[];
  classNames: string[];
  stageNames: string[];
}