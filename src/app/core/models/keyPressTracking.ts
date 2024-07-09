import { EntityBase } from "./entityBase";
import { Student } from "./student";
import { Test } from "./test";

export interface KeyPressTracking extends EntityBase{
    id: number;
    event: string | null;
    reason: string | null;
    dateModified?: Date; 
    studentId: number | null;
    testId: number | null;
    oldStudentId: number | null;
    oldTestId: number | null;
    student: Student | null;
    test: Test | null;
}