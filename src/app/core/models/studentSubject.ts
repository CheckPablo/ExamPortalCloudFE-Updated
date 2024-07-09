import { BulkImportSectorSubject } from "./bulkImportSectorSubject";
import { EntityBase } from "./entityBase";
import { Subject } from "./subject";

export interface StudentSubject extends EntityBase {
    id: number;
    candidateId: number | null;
    subjectId: number | null;
    oldSubjectId: number | null;
    bulkImportSectorSubjects: BulkImportSectorSubject[];
    subject: Subject | null;
}