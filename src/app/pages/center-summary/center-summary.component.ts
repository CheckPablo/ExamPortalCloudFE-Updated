import { Component,QueryList, ViewChildren } from '@angular/core';
import { CenterService } from 'src/app/core/services/shared/center.service';
import { Center } from 'src/app/core/models/center';
import { SortableHeaderDirective} from 'src/app/core/directives/sortable-header.directive'; 
import { PaginationService } from 'src/app/core/services/pagination.service';

@Component({
  selector: 'app-center-summary',
  templateUrl: './center-summary.component.html',
  styleUrls: ['./center-summary.component.css']
})
export class CenterSummaryComponent {
  centers: Center[] = []; 
  filter: string;
  @ViewChildren(SortableHeaderDirective) headers: QueryList<SortableHeaderDirective>;

  constructor(
    private centerService: CenterService,
    public paginationService: PaginationService)
  {}

  ngOnInit(): void {
    this.paginationService.setData([])
    this.getCenterSummaryList();
  }

  private getCenterSummaryList()
  {
    this.centerService.search([])
    .subscribe((res) => {
      
      this.centers = res; 
      this.paginationService.setData(res);     
      this.paginationService.onSearchInputChange(''); 
    });
  }
  public onSort(a: any) {
        
  }
}
