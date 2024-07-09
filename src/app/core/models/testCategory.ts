import { EntityBase } from "./entityBase";
import { Test } from "./test";

export interface TestCategory extends EntityBase{
    id: number;
    description: string | null;
    modifiedBy: number | null;
    modifiedDate: string | null;
    removed: boolean | null;
    tests: Test[];
}