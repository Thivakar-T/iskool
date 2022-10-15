import { TestBed } from '@angular/core/testing';
import { AcademicRecordService } from './academic-record.service';

describe('AcademicRecordService', () => {
  let service: AcademicRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcademicRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
