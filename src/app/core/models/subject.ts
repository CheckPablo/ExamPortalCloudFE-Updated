import { Assessment } from "./assessment";
import { BulkImportSectorSubject } from "./bulkImportSectorSubject";
import { EntityBase } from "./entityBase";
import { RandomOtp } from "./randomOtp";
import { StudentSubject } from "./studentSubject";
import { Test } from "./test";

export interface Subject extends EntityBase {
  id: number;
  code: string;
  description?: string;
  subjectGrade?: string;
  modifiedBy?: number;
  modifiedDate?: Date;
  removed?: boolean;
  sectorId: number;
}