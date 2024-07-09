import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from 'src/app/core/services/shared/spinner.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent  implements OnInit{
  showSpinner = false;
  constructor(private spinnerService: SpinnerService, private cdRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.init();
  }

  init() {

    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = (status === 'start');
      this.cdRef.detectChanges();
    });
  }
}
