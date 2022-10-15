import { TestBed } from '@angular/core/testing';

import { RoomlabService } from './roomlab.service';

describe('RoomlabService', () => {
  let service: RoomlabService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RoomlabService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
