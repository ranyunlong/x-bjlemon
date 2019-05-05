import { http } from "./base";

export function getJournalList(query: QueryJournalParams) {
    return  http.post<JournalListData>('/journal/query.action', query)
}

export interface QueryJournalParams {
    classId: number;
    page: number,
    rows: number
}

export interface JournalListData {
  total: number;
  rows: JournalInfo[];
}

export interface JournalInfo {
  jouCode: string;
  classId: number;
  skDate: string;
  skName: string;
  skTime: string;
  skPlan: string;
  skPlace: string;
  khWork: string;
  jouStatus: string;
  className: string;
  teacherName: string;
}