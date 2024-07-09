import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bg-video',
  templateUrl: './bg-video.component.html',
  styleUrls: ['./bg-video.component.css']
})
export class BgVideoComponent {

  text: any = {
    Weeks: 'Weeks',
    Days: 'Days',
    Hours: 'Hours',
    Minutes: 'Minutes',
    Seconds: 'Seconds',
  };

  constructor() { }

}
