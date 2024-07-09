import { EntityBase } from "./entityBase";
import { Student } from "./student";
import { Test } from "./test";

export interface Resulting extends EntityBase {
    studentID: number;
    id: number;
    testId: number | null;
    name:string | null;
    gradeId:string | null; 
    subject:string | null; 
    testName: string | null;
    fileName:string | null; 
    answerScript:string|null; 
    testCompleted:string| null; 
    completed :string | null;
    studentId: number | null;
    documentId:number | null; 
    regionId:number | null; 
    answer: string  | null;

} 