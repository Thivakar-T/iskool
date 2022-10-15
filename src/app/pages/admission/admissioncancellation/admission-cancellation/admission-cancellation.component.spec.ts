import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionCancellationComponent } from './admission-cancellation.component';

describe('AdmissionCancellationComponent', () => {
  let component: AdmissionCancellationComponent;
  let fixture: ComponentFixture<AdmissionCancellationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmissionCancellationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
