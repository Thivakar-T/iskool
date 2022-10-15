import { TestBed } from '@angular/core/testing';

import { AdmissionCommonDocumentService } from './admission-common-document.service';

describe('AdmissionCommonDocumentService', () => {
  let service: AdmissionCommonDocumentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdmissionCommonDocumentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
