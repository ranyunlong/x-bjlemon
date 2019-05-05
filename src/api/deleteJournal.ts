import { http } from "./base";

export function deleteJournal(ids: string | number) {
    return http.post<DeleteJournalData>('/journal/delete.action', {
        ids
    })
}

export interface DeleteJournalData {
  msg: string;
  success: boolean;
}