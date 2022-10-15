import { TestBed } from '@angular/core/testing';

import { StudentPromotionService } from './student-promotion.service';

describe('StudentPromotionService', () => {
  let service: StudentPromotionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentPromotionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
