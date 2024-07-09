import { EntityBase } from "./entityBase";
import { Student } from "./student";
import { Test } from "./test";

export interface Screenshot extends EntityBase{
    id: number;
    screenshotData: string | null;
    dateModified: string | null;
    testId: number | null;
    studentId: number | null;
    student: Student | null;
    test: Test | null;
}