import { TestBed } from '@angular/core/testing';

import { StudentMarkEntryService } from './student-mark-entry.service';

describe('StudentMarkEntryService', () => {
  let service: StudentMarkEntryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentMarkEntryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
