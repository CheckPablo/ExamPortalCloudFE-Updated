import { EntityBase } from "./entityBase";
import { Test } from "./test";

export interface TestSecurityLevel extends EntityBase{
    id: number;
    description: string | null;
    dateModified: string | null;
    tests: Test[];
}