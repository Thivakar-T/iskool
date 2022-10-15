import { TestBed } from '@angular/core/testing';

import { AcadamicBatchService } from './acadamic-batch.service';

describe('AcadamicBatchService', () => {
  let service: AcadamicBatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcadamicBatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
