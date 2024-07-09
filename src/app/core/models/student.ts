import { Grade } from "./grade";
import { Region } from "./region";
import { Center } from "./center";
import { Language } from "./language";
import { EntityBase } from "./entityBase";

export interface Student extends EntityBase{
    id: number;
    name: string | null;
    surname: string | null;
    examNo: string | null;
    idNumber: string | null;
    modifiedBy: number | null;
    modifiedDate: string | null;
    removed: boolean | null;
    updated: boolean | null;
    isOnline: boolean | null;
    password: string | null;
    passwordEncrypted: string | null;
    salt: string | null;
    studentNo: string | null;
    emailAddress: string | null;
    contactNo: string | null;
    sentConfirmation: boolean | null;
    certLangId: number | null;
    centerId: number | null;
    gradeId: number | null;
    regionId: number | null;
    oldRegionId: number | null;

    center: Center | null;
    certLang: Language | null;
    region: Region | null;
    grade: Grade | null;
    externalEmail?: string;
    eligibleForExternalLogin?: boolean | null;
}