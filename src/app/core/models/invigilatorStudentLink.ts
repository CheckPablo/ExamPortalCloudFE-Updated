import { EntityBase } from "./entityBase";
import { Student } from "./student";

export interface InvigilatorStudentLink extends EntityBase {
    id: number;
    dateModifed: string | null;
    invigilatorId: number | null;
    studentId: number | null;
    oldStudentId: number | null;
    student: Student | null;
}