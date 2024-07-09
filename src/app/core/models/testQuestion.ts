import { Assessment } from "./assessment";
import { EntityBase } from "./entityBase";
import { Question } from "./question";
import { Test } from "./test";

export interface TestQuestion extends EntityBase {
    id: number;
    questionNo: number | null;
    modifiedBy: number | null;
    modifiedDate: string | null;
    removed: boolean | null;
    testId: number;
    questionId: number;
    assessments: Assessment[];
    question: Question;
    test: Test;
}