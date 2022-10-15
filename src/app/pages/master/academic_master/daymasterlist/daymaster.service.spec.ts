import { TestBed } from '@angular/core/testing';

import { DaymasterService } from './daymaster.service';

describe('DaymasterService', () => {
  let service: DaymasterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaymasterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
