import { EntityBase } from "./entityBase";
import { Question } from "./question";

export interface QuestionType extends EntityBase {
    id: number;
    description: string | null;
    modifiedBy: number | null;
    modifiedDate: string | null;
    removed: boolean | null;
    questions: Question[];
}