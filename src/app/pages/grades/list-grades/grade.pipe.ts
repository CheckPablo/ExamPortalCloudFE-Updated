// import { Pipe, PipeTransform } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { Grade } from 'src/app/core/models/grade';

@Pipe({ name: 'gradeSort' })
export class GradesPipe implements PipeTransform {
  transform(values: Grade[], filter: string): Grade[] {
    console.log("inside grades pipe"); 
    if (!filter || filter.length === 0) {
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    return values.filter((value: Grade) => {
      const centerGradeCode =
        value.code.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const centerGradeDescription =
        value.description.toLowerCase().indexOf(filter.toLowerCase()) !== -1;

      if (centerGradeCode || centerGradeDescription) {
        return value;
      }
    });
  }
}