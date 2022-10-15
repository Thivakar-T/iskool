import { TestBed } from '@angular/core/testing';

import { RouteAllotmentService } from './route-allotment.service';

describe('RouteAllotmentService', () => {
  let service: RouteAllotmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteAllotmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
