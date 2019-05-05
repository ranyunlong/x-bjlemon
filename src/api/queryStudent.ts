import { http } from "./base";

/**
 * 查询学生
 */
export function queryStudent(query: QueryStudentParams = {page: 1, rows: 10}) {
    return http.post('/student/query.action', query)
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