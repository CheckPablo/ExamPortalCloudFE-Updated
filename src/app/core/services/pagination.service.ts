import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  sortConfig: { key: string; direction: 'asc' | 'desc' };
  searchTerm: string;
  sourceData: any[];
  searchedData: any[];
  paginatedData: any[];
  startIndex: number = 0;
  endIndex: number = 0;
  paginationLinks: number[] = [];
  totalPages: number = 1;
  searchTotal: number = 0;

  constructor() {
    this.currentPage = 1;
    this.pageSize = 10;
    this.totalItems = 0;
    this.sortConfig = { key: '', direction: 'asc' };
    this.searchTerm = '';
    this.sourceData = [];
  }

  generatePaginationLinks(): void {
    const totalItems = this.searchTotal;
    const totalPages = Math.ceil(totalItems / this.pageSize);
    const currentPage = this.currentPage;

    let startPage = 1;
    let endPage = totalPages <= 10 ? totalPages : 10;

    if (totalPages > 10) {
      if (currentPage <= 6) {
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    this.paginationLinks = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  goToNextPage(): void {
    const totalPages = this.totalPages;
    if (this.currentPage < totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  onSearchInputChange(searchQuery: string): void {
    this.setSearchQuery(searchQuery);
    this.filterData(this.sourceData);
    this.setPage(1);
    this.paginate();
  }

  setPage(page: number): void {
    this.currentPage = page;
    this.paginate();
  }

  setPageSize(size: number): void {
    
    
    this.pageSize = size;
    this.setPage(1);
    this.paginate();
  }

  setSortConfig(key: string, direction: 'asc' | 'desc'): void {
    this.sortConfig.key = key;
    this.sortConfig.direction = direction;
  }

  setSearchQuery(query: string): void {
    this.searchTerm = query;
  }

  setData(data: any[]): void {
    this.sourceData = data;
    this.updateTotalItems();
    this.paginate();
  }

  toggleSortDirection(): void {
    const currentDirection = this.sortConfig.direction;
    const newDirection = currentDirection === 'asc' ? 'desc' : 'asc';
    this.sortConfig.direction = newDirection;
  }

  private filterData(data: any[]): any[] {
    if (!this.searchTerm) {
      this.searchedData = data;
      this.searchTotal = data.length;
      return data;
    }

    const query = this.searchTerm.toLowerCase();
    
    this.searchedData = data.filter(item =>
      Object.values(item).some(value =>
        value
          ?.toString()
          ?.toLowerCase()
          ?.includes(query)
      )
    );

    this.searchTotal = this.searchedData.length;
    return this.searchedData;
  }

  private sortData(data: any[]): any[] {
    const { key, direction } = this.sortConfig;

    if (!key) {
      return data;
    }

    return data.sort((a, b) => {
      const aValue = a[key];
      const bValue = b[key];

      if (aValue < bValue) {
        return direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  updateTotalItems(): void {
    const filteredData = this.filterData(this.sourceData);
    this.totalItems = filteredData.length;
  }

  paginate() {
    const filteredData = this.filterData(this.sourceData);
    const sortedData = this.sortData(filteredData);
    const startIndex = (this.currentPage - 1) * this.pageSize
    const totalItems = filteredData.length;

    this.totalPages = Math.ceil(totalItems / this.pageSize);
    this.startIndex = startIndex + 1;
    this.endIndex = Math.min(startIndex + this.pageSize, sortedData.length);
    this.paginatedData = sortedData.slice(startIndex, this.endIndex);
    this.generatePaginationLinks();
  }
}
