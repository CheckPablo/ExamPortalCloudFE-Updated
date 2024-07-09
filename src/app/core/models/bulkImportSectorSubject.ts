import { BulkImportPerson } from "./bulkImportPerson";
import { EntityBase } from "./entityBase";
import { Grade } from "./grade";
import { StudentSubject } from "./studentSubject";
import { Subject } from "./subject";

export interface BulkImportSectorSubject extends EntityBase {
    id: number;
    sectorCode: string;
    sector: string;
    subjectCode: string;
    subject: string;
    studentNo: string;
    importDate: string | null;
    imported: boolean | null;
    bulkImportId: number | null;
    sectorId: number | null;
    subjectId: number | null;
    studentSubjectId: number | null;
    batchId: string | null;
    bulkImport: BulkImportPerson | null;
    sectorNavigation: Grade | null;
    studentSubject: StudentSubject | null;
    subjectNavigation: Subject | null;
}