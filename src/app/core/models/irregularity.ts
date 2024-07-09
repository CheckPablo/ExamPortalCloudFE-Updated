import { EntityBase } from "./entityBase";
import { Student } from "./student";
import { Test } from "./test";

export interface Irregularity extends EntityBase{
    id: number;
    keyPress: boolean | null;
    leftExamArea: boolean | null;
    offline: boolean | null;
    fullScreenClosed: boolean | null;
    dateModifed: string | null;
    testId: number | null;
    studentId: number | null;
    oldStudentId: number | null;
    oldTestId: number | null;
    student: Student | null;
    test: Test | null;
}