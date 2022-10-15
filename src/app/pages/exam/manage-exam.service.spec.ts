import { TestBed } from '@angular/core/testing';

import { ManageExamService } from './manage-exam.service';

describe('ManageExamService', () => {
  let service: ManageExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
