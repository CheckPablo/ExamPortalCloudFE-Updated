// import { Pipe, PipeTransform } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { Subject } from 'src/app/core/models/subject';

@Pipe({ name: 'subjectSort' })
export class SubjectsPipe implements PipeTransform {
  transform(values: Subject[], filter: string): Subject[] {
    if (!filter || filter.length === 0) {
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    return values.filter((value: Subject) => {
      const centerGradeCode =
        value.code.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const centerGradeDescription =
        value.description.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
        const subjectGrade =
        value.subjectGrade.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      if (centerGradeCode || centerGradeDescription || subjectGrade) {
        return value;
      }
    });
  }
}