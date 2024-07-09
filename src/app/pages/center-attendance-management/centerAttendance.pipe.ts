// import { Pipe, PipeTransform } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { Center } from 'src/app/core/models/center';
import { CenterAttendance } from 'src/app/core/models/centerAttendance';

@Pipe({ name: 'centerAttendanceSort' })
export class CenterAttendancePipe implements PipeTransform {
  transform(values: CenterAttendance[], filter: string): CenterAttendance[] {
    if (!filter || filter.length === 0) {
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    return values.filter((value: CenterAttendance) => {
      const centerName =
        value.centerName.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const testName =
        value.testName.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        const centerGradeDescription =
        value.gradeCode.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        const startDate =
        value.startDate.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        /*const numberOfStudents =
        value.numberOfStudents.v(filter) !== -1;*/

      if (centerName||centerGradeDescription || testName||startDate) {
        return value;
      }
    });
  }
}