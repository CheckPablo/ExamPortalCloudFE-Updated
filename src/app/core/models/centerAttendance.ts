import { EntityBase } from "./entityBase";
import { Student } from "./student";
import { Test } from "./test";
export interface CenterAttendance extends EntityBase{
  id: number;
  centerId:number;
  studentCount:number;
  centerTypeId:number;
  numberOfStudents:number; 
  centerName :string | null;
  testName :string | null;
  gradeId :number;
  gradeCode :string|null;
  testCode: string | null;
  testType: string | null;
  learningArea:string | null;
  startDate:string | null;
  modifiedDate: string | null;

 /* virtual CenterType? CenterType 
 virtual ICollection<Grade> Sectors { get; } = new List<Grade>();

 virtual ICollection<Student> Students { get; } = new List<Student>();

 virtual ICollection<Test> Tests { get; } = new List<Test>();

 virtual ICollection<User> Users { get; } = new List<User>();*/
}