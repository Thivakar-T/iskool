import { TestBed } from '@angular/core/testing';

import { FeeCollectionCounterService } from './fee-collection-counter.service';

describe('FeeCollectionCounterService', () => {
  let service: FeeCollectionCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeeCollectionCounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
