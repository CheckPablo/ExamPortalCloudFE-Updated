// import { Pipe, PipeTransform } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { Center } from 'src/app/core/models/center';

@Pipe({ name: 'centerSort' })
export class CenterPipe implements PipeTransform {
  transform(values: Center[], filter: string): Center[] {
    if (!filter || filter.length === 0) {
      return values;
    }

    if (values.length === 0) {
      return values;
    }

    return values.filter((value: Center) => {
      const centerGradeCode =
        value.name.toLowerCase().indexOf(filter.toLowerCase()) !== -1;
      const centerGradeDescription =
        value.expiryDate.toLowerCase().indexOf(filter.toLowerCase()) !== -1;

      if (centerGradeCode || centerGradeDescription) {
        return value;
      }
    });
  }
}