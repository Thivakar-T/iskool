import { TestBed } from '@angular/core/testing';

import { SessionTypeService } from './session-type.service';

describe('SessionTypeService', () => {
  let service: SessionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
