import { BulkImportSectorSubject } from "./bulkImportSectorSubject";
import { Center } from "./center";
import { RandomOtp } from "./randomOtp";
import { Stimulus } from "./stimulus";
import { Student } from "./student";
import { Test } from "./test";
import { EntityBase } from "./entityBase";

export interface Grade extends EntityBase {
    code: string;
    description: string | null;
    modifiedById: number | null;
    modifiedDate: string | null;
    removed: boolean | null;
    centerId: number | null;
    bulkImportSectorSubjects: BulkImportSectorSubject[];
    center: Center | null;
    randomOtps: RandomOtp[];
    stimuli: Stimulus[];
    students: Student[];
    tests: Test[];
}