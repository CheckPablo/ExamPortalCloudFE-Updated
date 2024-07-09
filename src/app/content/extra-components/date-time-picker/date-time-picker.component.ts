import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbDateStruct, NgbTimeStruct, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { FormControl } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { PerfectScrollbarConfigInterface, PerfectScrollbarComponent, PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

const now = new Date();
const I18N_VALUES = {
  en: {
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
};

// Range datepicker Start
const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;
// Range datepicker Ends


@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.css']
})
export class DateTimePickerComponent implements OnInit {

  @BlockUI('simpleDatepicker') blockUISimpleDatepicker: NgBlockUI;
  @BlockUI('disableDatepicker') blockUIDisableDatepicker: NgBlockUI;

  public config: PerfectScrollbarConfigInterface = { };
  @ViewChild(PerfectScrollbarComponent) componentRef?: PerfectScrollbarComponent;
  @ViewChild(PerfectScrollbarDirective, { static: true }) directiveRef?: PerfectScrollbarDirective;

  public breadcrumb: any;

  options = {
    close: true,
    expand: true,
    minimize: true,
    reload: true
  };

  // datePicker Variable declaration
  d: any;
  d2: any;
  d3: any;
  model: NgbDateStruct;
  popupModel;
  date: { year: number, month: number };
  displayMonths = 2;
  navigation = 'select';
  disabledModel: NgbDateStruct = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  disabled = true;
  customModel: NgbDateStruct;

    // timePicker Variable declaration
  meridian = true;
  time: NgbTimeStruct = { hour: 13, minute: 30, second: 30 };
  meridianTime: NgbTimeStruct = { hour: 13, minute: 30, second: 30 };
  secondsTime: NgbTimeStruct = { hour: 13, minute: 30, second: 30 };
  spinnersTime: NgbTimeStruct = { hour: 13, minute: 30, second: 30 };
  stepsTime: NgbTimeStruct = { hour: 13, minute: 30, second: 30 };
  validationTime: NgbTimeStruct = { hour: 13, minute: 30, second: 30 };
  seconds = true;
  spinners = true;
  hourStep = 1;
  minuteStep = 15;
  secondStep = 30;

  configModal;    // Global configuration of datepickers

  // Range datepicker start
  hoveredDate: NgbDateStruct;

  fromDate: NgbDateStruct;
  toDate: NgbDateStruct;

  // timePicker code
  ctrl = new FormControl('', (control: FormControl) => {
    const value = control.value;

    if (!value) {
      return null;
    }

    if (value.hour < 12) {
      return { tooEarly: true };
    }
    if (value.hour > 13) {
      return { tooLate: true };
    }

    return null;
  });

  // Range datepicker starts
  onDateChange(date: NgbDateStruct) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && after(date, this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered = date => this.fromDate && !this.toDate && this.hoveredDate && after(date, this.fromDate) && before(date, this.hoveredDate);
  isInside = date => after(date, this.fromDate) && before(date, this.toDate);
  isFrom = date => equals(date, this.fromDate);
  isTo = date => equals(date, this.toDate);
  // Range datepicker ends


  // Selects today's date
  selectToday() {
    this.model = { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() };
  }

  // Custom Day View Starts
  isWeekend(date: NgbDateStruct) {
    const d = new Date(date.year, date.month - 1, date.day);
    return d.getDay() === 0 || d.getDay() === 6;
  }

  isDisabled(date: NgbDateStruct, current: { month: number }) {
    return date.month !== current.month;
  }
  // Custom Day View Ends

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  // Using for Meridian
  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  // Using for Seconds
  toggleSeconds() {
    this.seconds = !this.seconds;
  }

  // Using for Spinners
  toggleSpinners() {
    this.spinners = !this.spinners;
  }

  ngOnInit() {
    this.selectToday();

    this.breadcrumb = {
      'mainlabel': 'Date Time Picker',
      'links': [
        {
          'name': 'Home',
          'isLink': true,
          'link': '/dashboard/sales'
        },
        {
          'name': 'Extra Components',
          'isLink': true,
          'link': '#'
        },
        {
          'name': 'Date Time Picker',
          'isLink': false
        }
      ]
    };
  }

  reloadSimpleDatepicker() {
    this.blockUISimpleDatepicker.start('Loading..');

    setTimeout(() => {
      this.blockUISimpleDatepicker.stop();
    }, 2500);
  }

  reloadDisableDatepicker() {
    this.blockUIDisableDatepicker.start('Loading..');

    setTimeout(() => {
      this.blockUIDisableDatepicker.stop();
    }, 2500);
  }
}
