import { EntityBase } from "./entityBase";
import { Student } from "./student";
import { Test } from "./test";

export interface Language extends EntityBase{
    id: number;
    description: string | null;
    code: string | null;
    modifiedBy: number | null;
    modifiedDate: string | null;
    removed: boolean | null;
    students: Student[];
    tests: Test[];
}