import { EntityBase } from "./entityBase";
import { Student } from "./student";
import { Subject } from "./subject";
import { Test } from "./test";
import { TestQuestion } from "./testQuestion";

export interface Assessment extends EntityBase{
    id: number;
    dateStart: string | null;
    dateEnd: string | null;
    score: number | null;
    bitAbsent: boolean | null;
    bitLangChanged: boolean;
    modifiedBy: number | null;
    modifiedDate: string | null;
    removed: boolean | null;
    studentId: number | null;
    testId: number | null;
    testQuestionId: number | null;
    subjectId: number | null;
    student: Student | null;
    subject: Subject | null;
    test: Test | null;
    testQuestion: TestQuestion | null;
}