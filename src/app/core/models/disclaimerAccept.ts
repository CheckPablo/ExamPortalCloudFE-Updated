import { EntityBase } from "./entityBase";
import { Student } from "./student";
import { Test } from "./test";

export interface DisclaimerAccept extends EntityBase {
    id: number;
    accepted: boolean | null;
    dateModified: string | null;
    testId: number | null;
    studentId: number | null;
    oldTestId: number | null;
    oldStudentId: number | null;
    student: Student | null;
    test: Test | null;
}