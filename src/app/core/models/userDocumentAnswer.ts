import { EntityBase } from "./entityBase";
import { Student } from "./student";
import { Test } from "./test";

export interface UserDocumentAnswer extends EntityBase{
    id: number;
    fileName: string | null;
    testDocument: string | null;
    timeStamp: string | null;
    testId: number | null;
    studentId: number;
    oldTestId: number | null;
    student: Student;
    test: Test | null;
}