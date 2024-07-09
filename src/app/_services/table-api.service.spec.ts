import { TestBed } from '@angular/core/testing';

import { TableApiService } from './table-api.service';

describe('TableApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TableApiService = TestBed.get(TableApiService);
    expect(service).toBeTruthy();
  });
});
