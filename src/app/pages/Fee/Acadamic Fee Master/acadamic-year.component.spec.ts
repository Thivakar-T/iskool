import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcadamicYearComponent } from './acadamic-year.component';

describe('AcadamicYearComponent', () => {
  let component: AcadamicYearComponent;
  let fixture: ComponentFixture<AcadamicYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcadamicYearComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcadamicYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
