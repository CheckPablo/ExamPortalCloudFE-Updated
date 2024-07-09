
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
//import { OperationResponse } from ''
import { OperationResponse } from 'src/app/core/models/OperationResponse';
import { ImageScan } from 'src/app/core/models/ImageScan';
import { ScanLogService } from 'src/app/core/services/shared/ScanLogService';
@Component({
  selector: 'app-test-writing-answerscan',
  templateUrl: './test-writing-answerscan.component.html',
  styleUrls: ['./test-writing-answerscan.component.css']
})
export class TestWritingAnswerscanComponent implements OnInit{

  public scannerEnabled: boolean = true;
  public transports: Transport[] = [];
  public information: string = "No se ha detectado información de ningún código. Acerque un código QR para escanear.";
  //private scannerEnabled: boolean = true

  constructor(private scanlogService: ScanLogService, private cd: ChangeDetectorRef) {
  }

  
  ngOnInit() {
  }

  public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
    this.information = "Espera recuperando información... ";

    const appointment = new ImageScan($event);
    this.scanlogService.logAppointment(appointment).subscribe(
      (result: OperationResponse) => {
        this.information = $event;
        this.transports = result.object;
        this.cd.markForCheck();
      },
      (error: any) => {
        this.information = "Ha ocurrido un error por favor intentalo nuevamente ... ";
        this.cd.markForCheck();
      });
  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
    this.information = "No se ha detectado información de ningún código. Acerque un código QR para escanear.";
  }

}

interface Transport {
  plates: string;
  slot: Slot;
}

interface Slot {
  name: string;
  description: string;
}

