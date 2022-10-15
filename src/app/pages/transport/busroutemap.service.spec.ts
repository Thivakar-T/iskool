import { TestBed } from '@angular/core/testing';

import { BusroutemapService } from './busroutemap.service';

describe('BusroutemapService', () => {
  let service: BusroutemapService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusroutemapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
