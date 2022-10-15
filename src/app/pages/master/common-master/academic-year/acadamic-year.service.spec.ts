import { TestBed } from '@angular/core/testing';

import { AcadamicYearService } from './acadamic-year.service';

describe('AcadamicYearService', () => {
  let service: AcadamicYearService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcadamicYearService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
