import { http } from "./base";

export function updateStudentJournal(data: UpdataStudentJournalParmas){
    return http.post<UpdataStudentJournalData>('/journal/update.action', data)

}

export interface UpdataStudentJournalParmas {
    detId: number;
    jouCode: number;
    stuId: number;
    skFs: string;
    stuName: string;
    phone:  any;
    homeWork: string;
    gradeEvaluation: string;
    gradePapers: string;
    remark: string;
    homeworkCall: string;
    callRes: string;
    drKq: string;
    isMail: string;
}

export interface UpdataStudentJournalData {
  isError: boolean;
  msg: string;
}