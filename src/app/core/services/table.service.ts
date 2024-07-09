import { ChangeDetectorRef, Injectable, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortDirection } from '../directives/advanced-sortable.directive';

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: string;
    sortDirection: SortDirection;
    startIndex: number;
    endIndex: number;
    totalRecords: number;
}

export interface SearchResult {
    tables: any[];
    total: number;
}

@Injectable({
    providedIn: 'root'
})

export class TableService {
    private sortableTableData: any[] = []; 
    private _loading$ = new BehaviorSubject<boolean>(true);
    private _search$ = new Subject<void>();
    private _tables$ = new BehaviorSubject<any[]>([]);
    private _total$ = new BehaviorSubject<number>(0);
    private _state: State = {
        page: 1,
        pageSize: 10,
        searchTerm: '',
        sortColumn: '',
        sortDirection: '',
        startIndex: 0,
        endIndex: 9,
        totalRecords: 0
    };

    constructor(private pipe: DecimalPipe, private changeDetector: ChangeDetectorRef) {
        this._search$.pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(200),
            switchMap(() => this._search()),
            delay(200),
            tap(() => this._loading$.next(false))
        ).subscribe(result => {
            this._tables$.next(result.tables);
            this._total$.next(result.total);
        });
        this._search$.next();
    }

    get tables$() { return this._tables$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }
    get startIndex() { return this._state.startIndex; }
    get endIndex() { return this._state.endIndex; }
    get totalRecords() { return this._state.totalRecords; }

    set page(page: number) { this._set({ page }); }
    set pageSize(pageSize: number) { this._set({ pageSize }); }
    set startIndex(startIndex: number) { this._set({ startIndex }); }
    set endIndex(endIndex: number) { this._set({ endIndex }); }
    set totalRecords(totalRecords: number) { this._set({ totalRecords }); }
    set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
    set sortColumn(sortColumn: string) { this._set({ sortColumn }); }
    set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

        // 1. sort
        let tables = this.sort(this.sortableTableData, sortColumn, sortDirection);

        // 2. filter
        tables = tables.filter(table => this.matches(table, searchTerm, this.pipe));
        const total = tables.length;

        // 3. paginate
        this.totalRecords = tables.length;
        this._state.startIndex = (page - 1) * this.pageSize + 1;
        this._state.endIndex = (page - 1) * this.pageSize + this.pageSize;
        if (this.endIndex > this.totalRecords) {
            this.endIndex = this.totalRecords;
        }

        tables = tables.slice(this._state.startIndex - 1, this._state.endIndex);
        
        this.changeDetector.detectChanges();
        
        return of(
            { tables, total }
        );
    }
   
    private compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

    private matches(tableRow: any, term: string, pipe: PipeTransform) {
        return tableRow.code?.toLowerCase().includes(term.toLowerCase())
            || tableRow.description?.toLowerCase().includes(term)
    }

    public setData = (data: any[]) => {
        this.sortableTableData = data;
        this._search$.pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(200),
            switchMap(() => this._search()),
            delay(200),
            tap(() => this._loading$.next(false))
        ).subscribe(result => {
            this._tables$.next(result.tables);
            this._total$.next(result.total);
        });
        this._search$.next();
    }

    private sort(tables: any[], column: string, direction: string): any[] {
        if (direction === '' || column === '') {
            return tables;
        } else {
            return [...tables].sort((a, b) => {
                const res = this.compare(`${a[column]}`, `${b[column]}`);
                return direction === 'asc' ? res : -res;
            });
        }
    }
}
