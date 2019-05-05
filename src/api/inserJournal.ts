import { http } from "./base";

/**
 * 添加新助教日志
 */

export function inserJournal(data: InserJournalParams) {
    http.post<InserJournalData>('/journal/inserNewJur.action', data)
}

export interface InserJournalParams {
    date: string;
    classId: string | number;
}

export interface InserJournalData {
  msg: string;
  success: boolean;
}