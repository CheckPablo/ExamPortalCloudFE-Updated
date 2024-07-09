import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { Grade } from 'src/app/core/models/grade';

export type SortColumn = keyof Grade | '';
export type SortDirection = 'asc' | 'desc' | '';

const rotate: { [key: string]: SortDirection } = {
  asc: 'desc',
  desc: '',
  '': 'asc',
};

export const compare = (
  v1: string | number | boolean | Date,
  v2: string | number | boolean | Date,
) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export interface SortEvent {
  //column: SortColumn;
  column: string;
  direction: SortDirection;
}

/*code: string;
description: string | null;
modifiedById: number | null;
modifiedDate: string | null;
removed: boolean | null;
centerId: number | null;
bulkImportSectorSubjects: BulkImportSectorSubject[];
center: Center | null;
randomOtps: RandomOtp[];
stimuli: Stimulus[];
students: Student[];
tests: Test[];*/

@Directive({
  selector: 'th[sortable]',
  host: {
    '[class.asc]': 'direction === "asc"',
    '[class.desc]': 'direction === "desc"',
    '(click)': 'rotate()',
  },
})
export class SortableHeaderDirective {
    constructor() { }
  ////@Input() sortable: SortColumn = '';
  @Input() sortable: string = '';
  @Input() direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();

  rotate() {
    this.direction = rotate[this.direction];
    this.sort.emit({ column: this.sortable, direction: this.direction });
  }
}
