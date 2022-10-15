import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcadamicBatchComponent } from './acadamic-batch.component';

describe('AcadamicBatchComponent', () => {
  let component: AcadamicBatchComponent;
  let fixture: ComponentFixture<AcadamicBatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcadamicBatchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcadamicBatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
