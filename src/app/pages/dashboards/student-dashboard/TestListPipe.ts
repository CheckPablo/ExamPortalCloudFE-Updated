
import { Pipe, PipeTransform } from '@angular/core';
import { Grade } from 'src/app/core/models/grade';
import { StudentTest } from 'src/app/core/models/studentTest';

@Pipe({ name: 'studentTestListSort' })
export class TestListPipe implements PipeTransform {
  transform(values: StudentTest[], filter: string): StudentTest[] {
    if (!filter || filter.length === 0) {
      
       
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    return values.filter((value: StudentTest) => {
      const centerGradeCode =
        value.testName.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      //const centerGradeDescription =
        //value.description.toLowerCase().indexOf(filter.toLowerCase()) !== -1;

        //if (centerGradeCode || centerGradeDescription) {
        if (centerGradeCode) {
        return value;
      }
    });
  }
}