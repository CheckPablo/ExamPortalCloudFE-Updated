import { CenterType } from "./centerType";
import { Province } from "./province";
import { RandomOtp } from "./randomOtp";
import { Grade } from "./grade";
import { Student } from "./student";
import { Test } from "./test";
import { UserRole } from "./userRole";
import { User } from "./user";
import { EntityBase } from "./entityBase";

export interface Center extends EntityBase {
    id: number;
    name: string | null;
    modifiedBy: number | null;
    modifiedDate: string | null;
    removed: boolean | null;
    prefix: string | null;
    disclaimer: string | null;
    centerNo: number | null;
    attendanceRegisterPassword: string | null;
    expiryDate: string | null;
    lastUsedUpdate: string | null;
    maximumLicense: number | null;
    provinceId: number | null;
    centerTypeId: number | null;
    centerType: CenterType | null;
    province: Province | null;
    randomOtps: RandomOtp[];
    sectors: Grade[];
    students: Student[];
    tests: Test[];
    userRoles: UserRole[];
    users: User[];
    studentCount: number | null; 
    registeredTests: number | null; 
    studentsCompleted: number | null; 
    studentsLinked: number | null; 
    
}