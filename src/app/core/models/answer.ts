import { EntityBase } from "./entityBase";
import { Question } from "./question";

export interface Answer extends EntityBase {
    id: number;
    answerId: number;
    questionId: number;
    optionCode: string | null;
    answerDesc: string | null;
    question: Question;
}