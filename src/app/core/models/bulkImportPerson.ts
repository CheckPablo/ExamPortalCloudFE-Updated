import { BulkImportSectorSubject } from "./bulkImportSectorSubject";
import { EntityBase } from "./entityBase";
import { Student } from "./student";

export interface BulkImportPerson extends EntityBase {
    id: number;
    centerNo: number;
    name: string;
    surname: string;
    idNumber: string;
    studentNo: string;
    email: string | null;
    cellPhone: string | null;
    importDate: string | null;
    imported: boolean | null;
    studentId: number | null;
    centerId: number | null;
    batchId: string | null;
    regionId: number | null;
    bulkImportSectorSubjects: BulkImportSectorSubject[];
    student: Student | null;
}