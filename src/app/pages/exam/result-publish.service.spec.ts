import { TestBed } from '@angular/core/testing';

import { ResultPublishService } from './result-publish.service';

describe('ResultPublishService', () => {
  let service: ResultPublishService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResultPublishService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
