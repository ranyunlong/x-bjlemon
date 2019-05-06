import { http } from "./base";

/**
 * 删除教学日志列表
 * @param ids 
 */
export function deleteJournal(ids: string | number) {
    return http.post<DeleteJournalData>('/journal/delete.action', {
        ids
    })
}

export interface DeleteJournalData {
  msg: string;
  success: boolean;
}