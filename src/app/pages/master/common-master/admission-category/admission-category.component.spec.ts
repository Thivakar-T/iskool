import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionCategoryComponent } from './admission-category.component';

describe('AdmissionCategoryComponent', () => {
  let component: AdmissionCategoryComponent;
  let fixture: ComponentFixture<AdmissionCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissionCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
