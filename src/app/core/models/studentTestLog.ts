import { EntityBase } from "./entityBase";
import { Student } from "./student";
import { Test } from "./test";

export interface StudentTestLog  extends EntityBase{
    id: number;
    processName: string | null;
    processDate: string | null;
    studentId: number | null;
    testId: number | null;
    oldStudentId: number | null;
    oldTestId: number | null;
    student: Student | null;
    test: Test | null;
}