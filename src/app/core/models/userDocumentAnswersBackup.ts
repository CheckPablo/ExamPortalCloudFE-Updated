import { EntityBase } from "./entityBase";
import { Student } from "./student";
import { Test } from "./test";

export interface UserDocumentAnswersBackup extends EntityBase{
    id: number;
    fileName: string | null;
    testDocument: string | null;
    timeStamp: string | null;
    testId: number | null;
    studentId: number | null;
    oldStudentId: number | null;
    oldTestId: number | null;
    student: Student | null;
    test: Test | null;
}