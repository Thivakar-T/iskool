import { TestBed } from '@angular/core/testing';

import { GradeListService } from './grade-list.service';

describe('GradeListService', () => {
  let service: GradeListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradeListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
