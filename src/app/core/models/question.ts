import { Answer } from "./answer";
import { EntityBase } from "./entityBase";
import { QuestionType } from "./questionType";
import { Stimulus } from "./stimulus";
import { TestQuestion } from "./testQuestion";

export interface Question extends EntityBase {
    id: number;
    questionCode: string | null;
    questionStem: string | null;
    questionInstruction: string | null;
    modifiedBy: number | null;
    modifiedDate: string | null;
    removed: boolean | null;
    noteId: string | null;
    questionTypeId: number | null;
    stimulusId: number | null;
    answers: Answer[];
    questionType: QuestionType | null;
    stimulus: Stimulus | null;
    testQuestions: TestQuestion[];
}