import { EntityBase } from "./entityBase";


export interface StudentTestAnswer extends EntityBase {
    id: number;
    studentId?: number;
    testId : number; 
    accomodation: boolean | null;
    offline: boolean | null;
    fullScreenClosed: boolean | null;
    keyPress :boolean | null;
    leftExamArea: boolean | null;
    timeRemaining: string | null;
    answerText?: string | null;
    fileName: string | null;

}