
import { DatePipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Center } from 'src/app/core/models/center';
import { AuthService } from 'src/app/core/services/shared/auth.service';
import { TokenStorageService } from 'src/app/core/services/token-storage.service';
import { CenterService } from 'src/app/core/services/shared/center.service';
import { ModalSizes } from 'src/app/core/utilities/modal-sizes';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SortableHeaderDirective, SortEvent, compare} from 'src/app/core/directives/sortable-header.directive'
import { User } from 'src/app/core/models/user';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PaginationService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-list-centers',
  templateUrl: './list-centers.component.html',
  styleUrls: ['./list-centers.component.css']
})
export class ListCentersComponent implements OnInit{
  centers: Center[] = []; 
  centerIdClicked: number;
  filter: string;
  isAllSelected = false;
  isPageLoaded = false;
  selectedCenterIds: number[] = [];
  submitted = false;
  returnUrl: string;
  form: FormGroup;
  loading = false;
  error!: any;
  user: User | null;
  token :string|null;
  duration = 50; 
  timer:any|null; 
  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;
  currentUrl: string ='';


  constructor(
    private storage: TokenStorageService,
    private modalService: NgbModal,
    private centerService: CenterService,
    private authService: AuthService,   
    private formBuilder: UntypedFormBuilder,
    public paginationService: PaginationService,
    private datePipe:DatePipe,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.paginationService.setData([])
    this.getCenters();
    this.initForms();
    this.user = this.storage.getUser();
    this.route.url.subscribe((segments) => {
      // Construct the current URL from the segments
      this.currentUrl = segments.map((segment) => segment.path).join('/');
       
    })
  }

  get f() { return this.form.controls; }
  
  private getCenters()
  {
    this.centerService.get()
    .subscribe((res) => {
      
      this.centers = res; 
      this.paginationService.setData(res);     
      this.paginationService.onSearchInputChange(''); 
    });
  }
  private initEditForms(center: Center): void {
    this.centerIdClicked = center.id; 
    const date = this.datePipe.transform(center.expiryDate, 'yyyy-MM-dd');
    this.form = this.formBuilder.group({
      id: [center.id, [Validators.required]],
      centerTypeId : [center.centerTypeId, Validators.required], 
      prefix:[center.prefix, [Validators.required]], 
      name: [center.name, [Validators.required]],
      //expiryDate: [center.expiryDate, [Validators.required]],
      //expiryDate: ['2023-05-25'],
      expiryDate: [date, [Validators.required]],
      centerNo:[center.centerNo, [Validators.required]], 
      IEBCPCode:[''], 
      provinceId : [center.provinceId, [Validators.required]],
      maximumLicense : [center.maximumLicense, [Validators.required]],
    });
    this.submitted = false;
  }

  private initForms(): void {
    this.form = this.formBuilder.group({
      //id: [center.id, [Validators.required]],
      centerTypeId : ['', Validators.required], 
      prefix:['', [Validators.required]], 
      name: ['', [Validators.required]],
      //expiryDate: ['', [Validators.required]],
      expiryDate: [this.datePipe.transform(new Date(), 'yyyy/MM/dd'), [Validators.required]],
      //this.toDate = this.datePipe.transform(new Date(),'dd/MM/yy HH:mm');
      centerNo:['', [Validators.required]],
      //IEBCPCode:[''], 
      provinceId : ['', [Validators.required]],
      maximumLicense : ['', [Validators.required]],
    });

    this.submitted = false;
  }

  public onCenterLogin() {
    
     this.authService.loginAdmin(this.user.username,"password@01", this.centerIdClicked, 'iPpd@jsoa5dpjo1s')
      .subscribe((user) =>
       {
        //this.storage.saveAdminUser(user);
        this.user = user;
        //this.storage.saveUser(user); 
        this.storage.saveUser(user);
        this.storage.saveToken(user.token);
        window.location.reload(); 
         
      });
      this.router.navigate(["/portal"]);
}

public startTimer(interval) {
  this.timer = setInterval(() => {
      --this.duration;
    
  }, interval);
}

 stopTimer() {
  if (this.timer) {
    clearInterval(this.timer);
    window.location.reload(); 
    
  } else {
    
  }
}

  public onDeleteCenter(center: Center) {
    this.initEditForms(center); 
    Swal.fire({
      title: 'Are you sure you want to delete this center?',
      text: 'This will delete the center',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.centerService.delete(center.id)
          .subscribe(() => {
            this.getCenters();
            Swal.fire('Center Deleted', 'Center deleted successfully.', 'success');
          });
      }
    });
  }

  public onSelectAll() {
    this.isAllSelected = !this.isAllSelected
    this.selectedCenterIds = []

    if (this.isAllSelected) {
      this.paginationService.searchedData.forEach(center => {
        this.selectedCenterIds.push(center.id)
      });
    }
  }

  onSort({ column, direction }: SortEvent) {
    
    //resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
  
    if (direction === ''|| column ==='') {
      //this.grades = this.grades;
      //this.grades = this.grades; 
      this.paginationService.paginatedData = this.paginationService.paginatedData;
  
    } else {
        //this.grades.sort((a, b) => {
        //this.grades = [...this.grades].sort((a, b) => {
        const sorted = this.paginationService.paginatedData.sort((a, b) => {
        //this.gradePaginationService.paginatedData = [...this.gradePaginationService.paginatedData].sort((a, b) => {
        const res = compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
      this.paginationService.paginatedData = [...sorted];
    }
    //this.service.sortColumn = column;
    //this.service.sortDirection = direction;
  }
  /*public onSort(a: any) 
  {
        
  }*/

   public onEditSubmit() {
    this.submitted = true;
     
    if (this.form.invalid) {return;}

    this.centerService.update(this.f['id'].value, this.form.value)
    .subscribe(() => {
      this.getCenters();
      this.initForms();
      this.modalService.dismissAll();
      Swal.fire('Center Updated', 'Center information updated.', 'success');
    });
  }
  public onSubmit() {
    this.submitted = true;
  
    
    if (this.form.invalid) {return;}
    this.centerService.create(this.form.value)
      .subscribe(() => {
        this.getCenters();
        this.initForms();
        this.modalService.dismissAll();
        Swal.fire('Center Saved', 'Center information saved. You may capture a new center.', 'success');
      });
  }

  public openUpdateModal(modal,center: Center) {
    this.initEditForms(center); 
    this.modalService.open(modal, ModalSizes.lg);
  }

  
  public openModal(modal: any) {
    this.form.reset(); 
    this.modalService.open(modal, ModalSizes.md);
  }
}
