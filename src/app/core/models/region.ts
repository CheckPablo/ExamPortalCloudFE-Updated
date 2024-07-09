import { EntityBase } from "./entityBase";
import { Student } from "./student";

export interface Region extends EntityBase {
    id: number;
    description: string | null;
    centerId: number | null;
    students: Student[];
}