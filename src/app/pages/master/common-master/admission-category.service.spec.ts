import { TestBed } from '@angular/core/testing';

import { AdmissionCategoryService } from './admission-category.service';

describe('AdmissionCategoryService', () => {
  let service: AdmissionCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmissionCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
