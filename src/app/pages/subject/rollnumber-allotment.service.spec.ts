import { TestBed } from '@angular/core/testing';

import { RollnumberAllotmentService } from './rollnumber-allotment.service';

describe('RollnumberAllotmentService', () => {
  let service: RollnumberAllotmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RollnumberAllotmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
