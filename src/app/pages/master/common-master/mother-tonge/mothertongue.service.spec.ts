import { TestBed } from '@angular/core/testing';

import { MothertongueService } from './mothertongue.service';

describe('MothertongueService', () => {
  let service: MothertongueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MothertongueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
