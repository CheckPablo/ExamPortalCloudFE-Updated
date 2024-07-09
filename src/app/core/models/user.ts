import { Center } from "./center";
import { CenterType } from "./centerType";
import { UserRole } from "./userRole";
import { EntityBase } from "./entityBase";

export interface User extends EntityBase {
    role: any;
    username: string | null;
    name: string | null;
    surname: string | null;
    password: string | null;
    passwordHash: string | null;
    passwordSalt: string | null;
    description: string | null;
    userEmailAddress: string | null;
    contactDetails: string | null;
    numberOfCandidates: number | null;
    vsoftApproved: boolean | null;
    termsAndConditions: boolean | null;
    modified: string | null;
    isActive: boolean | null;
    isSchoolAdmin: boolean | null;
    centerTypeId: number | null;
    centerId: number;
    impersonatedCenterId: number;
    email: string
    fullName: string
    firstName: string
    token: string
    disclaimer: string
    centerName:string |null; 
    center: Center;
    centerType: CenterType | null;
    userRoles: UserRole[];
    adminPwd: string |null; 

}