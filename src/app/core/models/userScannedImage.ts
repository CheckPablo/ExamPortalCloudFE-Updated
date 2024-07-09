import { EntityBase } from "./entityBase";
import { Student } from "./student";
import { Test } from "./test";

export interface UserScannedImage  extends EntityBase{
    id: number;
    fileName: string;
    otp: string | null;
    expiryDate: string | null;
    complete: number | null;
    testId: number | null;
    studentId: number | null;
    oldStudentId: number | null;
    oldTestId: number | null;
    student: Student | null;
    test: Test | null;
}