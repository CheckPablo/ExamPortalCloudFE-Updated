// import { Pipe, PipeTransform } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/core/models/student';

@Pipe({ name: 'usersSort' })
export class UsersPipe implements PipeTransform {
  transform(values: Student[], filter: string): Student[] {
    if (!filter || filter.length === 0) {
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    return values.filter((value: Student) => {
       
      const centerGradeCode =
        value.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const centerGradeDescription =
        value.surname.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        const ExamNo =
        value.examNo.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        const IDNo =
        value.idNumber.toLowerCase().indexOf(filter.toLowerCase()) !== -1;

      if (centerGradeCode || centerGradeDescription || ExamNo || IDNo) {
        return value;
      }
    });
  }
}