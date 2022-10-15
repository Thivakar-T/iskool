import { TestBed } from '@angular/core/testing';

import { FeeMasterService } from './feemaster.service';

describe('AcadamicYearService', () => {
  let service: FeeMasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeeMasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
