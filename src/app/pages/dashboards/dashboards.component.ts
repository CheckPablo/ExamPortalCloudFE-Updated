import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { ModalSizes } from 'src/app/core/utilities/modal-sizes';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent {
  user: User;
 
  constructor(
    private storage: TokenStorageService,
    private modalService: NgbModal, 
    private router: Router,
  ){
    this.user = this.storage.getUser();
    console.log(this.user); 
     
  }

}
