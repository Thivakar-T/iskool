import { TestBed } from '@angular/core/testing';

import { DaymasterlistService } from './daymasterlist.service';

describe('DaymasterlistService', () => {
  let service: DaymasterlistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaymasterlistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
