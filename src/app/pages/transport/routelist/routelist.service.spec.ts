import { TestBed } from '@angular/core/testing';

import { RoutelistService } from './routelist.service';

describe('RoutelistService', () => {
  let service: RoutelistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoutelistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
