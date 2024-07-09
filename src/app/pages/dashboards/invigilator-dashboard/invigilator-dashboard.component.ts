import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/core/models/user';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { ModalSizes } from 'src/app/core/utilities/modal-sizes';
import { UserService } from 'src/app/core/services/shared/user.service';
import { AuthService } from 'src/app/core/services/shared/auth.service';
import { CenterService } from 'src/app/core/services/shared/center.service';
import { Center } from 'src/app/core/models/center';


@Component({
  selector: 'app-invigilator-dashboard',
  templateUrl: './invigilator-dashboard.component.html',
  styleUrls: ['./invigilator-dashboard.component.css']
})
export class InvigilatorDashboardComponent {
  centerDetails: Center[];
  userDetails: User[];
  user: User;
  maximumLicense: number | null; 
  studentCount:   number | null; 
  expiryDate:     string | null;
 
  constructor(
    private storage: TokenStorageService,
    private modalService: NgbModal, 
    private router: Router,
    private userService: UserService,
    private authService: AuthService,
    private centerService: CenterService,
  )
  
  {
    this.user = this.storage.getUser();
  }

  ngOnInit(){
    this.getUser(); 
    this.CenterByUserId();
  }

  private getUser() {
    const user = this.authService.currentUserValue(); 
    console.log(user); 
    this.userService.getById(`${user.id}`)
    //this.userService.getById(this.user.id)
      .subscribe((data) => {
        this.user = data;
        //this.userDetails.push(data);
        console.log(this.user); 
        //this.initEditForm(data);
      })
  }
  
  private CenterByUserId() {
    console.log(this.userDetails);
    const user = this.authService.currentUserValue(); 
    console.log(this.user); 
    this.centerService.getCenterByUserId(this.user.username)
    //this.userService.getById(this.user.id)
      .subscribe((data) => {
        this.centerDetails= data;
        this.maximumLicense = data[0].maximumLicense; 
        this.expiryDate =  data[0].expiryDate; 
        this.studentCount = data[0].studentCount; 
        console.log(this.centerDetails); 
        //this.initEditForm(data);
      })
  }

  public openModal(modal: any) {
    this.modalService.open(modal, ModalSizes.lg);
  }
  public navigateToGrades() {
    this.modalService.dismissAll();
    this.router.navigate(["portal/grades"]);
  }

  public navigateToSubjectMaintenance() {
    this.modalService.dismissAll();
    this.router.navigate(["portal/subjects"]);
  }

  public navigateToUserAdmin() {
    this.modalService.dismissAll();
    this.router.navigate(["portal/users"]);
  }

  public navigateToStudentMaintenance() {
    this.modalService.dismissAll();
    this.router.navigate(["portal/students"]);
  }
  public navigateToAddStudent() {
    this.modalService.dismissAll();
    this.router.navigate(["portal/students/add-student"]);
  }
  public navigateToViewTests() {
    this.modalService.dismissAll();
    this.router.navigate(["portal/testupload/view-tests"]);
    ///portal/testupload/view-tests'
  }
  public navigateToTestUpload() {
    this.modalService.dismissAll();
    this.router.navigate(["portal/testupload/test-upload"]);
  }

  public navigateToTestOTP() {
    this.modalService.dismissAll();
    this.router.navigate(["portal/testupload/tests-otp"]);
  }

  public navigateToAttendanceRegister(){
    this.router.navigate(["portal/attendance-register"]); 
  }

  public navigateToCenterAttendance(){
    this.router.navigate(["portal/center-attendance-management"]);
  }
  public navigateToCenters() {
  this.router.navigate(["portal/centers"])
  }
  public navigateToLiveMonitoring() {
    this.modalService.dismissAll();
    this.router.navigate(["portal/live-test-monitoring"])
   }

  public navigateToTestChat() {
    this.modalService.dismissAll();
    this.router.navigate(["portal/candidate-live-monitoring-chat"])
  }
}
