import { EntityBase } from "./entityBase";
import { Student } from "./student";
import { Test } from "./test";

export interface StudentTest extends EntityBase {
    id: number;
    centerID : number; 
    absent: boolean | null;
    modifiedBy: number | null;
    modifiedDate: string | null;
    completed :string | null;
    upload :boolean | null;
    removed: boolean | null;
    startDate: string | null;
    examDate: string | null;
    endDate: string | null;
    examTime: string | null;
    electronicReader: boolean | null;
    accomodation: boolean | null;
    studentExtraTime: string | null;
    loginUid: string | null;
    testLoadedInBrowser: boolean | null;
    studentId: number | null;
    testId: number | null;
    oldStudentId: number | null;
    oldTestId: number | null;
    Offline :boolean | null;
    student: Student | null;
    test: Test | null;
    questionCount: number | null;
    testName: string | null;
    testSecurityLevelId: number | null;

}