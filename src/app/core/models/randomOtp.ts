import { Center } from "./center";
import { EntityBase } from "./entityBase";
import { Grade } from "./grade";
import { Subject } from "./subject";
import { Test } from "./test";

export interface RandomOtp extends EntityBase{
    id: number;
    otp: number;
    dateModified: string | null;
    duration: string | null;
    examDate: string | null;
    paperExpiryDate: string | null;
    modifiedBy: string | null;
    centerId: number;
    testId: number | null;
    sectorId: number | null;
    subjectId: number | null;
    oldTestId: number | null;
    oldSectorId: number | null;
    oldSubjectId: number | null;
    otpexpiryDate: string | null;
    center: Center;
    sector: Grade | null;
    subject: Subject | null;
    test: Test | null;
}