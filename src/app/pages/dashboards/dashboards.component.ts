import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/shared/auth.service';
import { StudentService } from 'src/app/core/services/shared/student.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { ModalSizes } from 'src/app/core/utilities/modal-sizes';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css']
})
export class DashboardsComponent {
  user: User;
  passString: string; 
 
  constructor(
    private storage: TokenStorageService,
    private modalService: NgbModal, 
    private router: Router,
    private studentService: StudentService,
    private authService: AuthService,
  ){
    this.user = this.storage.getUser();
    console.log(this.user)
    if(!this.user || this.user == null || this.user == undefined)
    {
      if(!this.user){
        console.log("== !this.user", this.user)
      } 
      if(this.user == null){
        console.log("== null",this.user)
      } 
      if(this.user== undefined){
        console.log("== undefined", this.user)
      } 
      console.log("Main Dashboard NOT USER",JSON.stringify(this.user)); 
      console.log("Main Dashboard NOT USER STRINGIFIED",JSON.stringify(JSON.stringify(this.user))); 
      //this.user.role == 3;
      const decodedUrl = decodeURIComponent(this.router.url);
      console.log("Main DashboardPURL decodedUrl",decodedUrl);
      const urlPath = decodedUrl.split('/'); 
      console.log("Main DashboardPURL PATH",urlPath);
    }
      ///if(localStorage.getItem('isFinishTestClicked')){
        ///this.studentService.finishTestDashBoardredirect(888)

         // get cred

        //this.router.navigate use full path or 


        // or use login method below  
           //const payload = { username, password:"iPpd@jsoa5dpjo1s", impersonatedCenterId,adminPwd}
        /* const payload = {username:this.user.username, password:this.passString}
        this.authService
        //.loginStudent(this.StudentloginForm.value)
        .loginStudent(payload)
        .subscribe((response) => {
        
        }
        , (error) => {
        //this.title = error.title;
        //this.content = `<p>${error.message.join('</p><p>')}</p>`;
        //this.show = true;
        });
      } */

      //clear the local storage
    else{
      console.log("Main Dashboard",JSON.stringify(this.user)); 
      localStorage.getItem('isFinishTestClicked')
    }
    
  }
}
