import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmissionCommonDocumentComponent } from './addmission-common-document.component';

describe('AddmissionCommonDocumentComponent', () => {
  let component: AddmissionCommonDocumentComponent;
  let fixture: ComponentFixture<AddmissionCommonDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmissionCommonDocumentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmissionCommonDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
