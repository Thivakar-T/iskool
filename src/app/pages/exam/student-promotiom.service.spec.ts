import { TestBed } from '@angular/core/testing';

import { StudentPromotiomService } from './student-promotiom.service';

describe('StudentPromotiomService', () => {
  let service: StudentPromotiomService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentPromotiomService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
