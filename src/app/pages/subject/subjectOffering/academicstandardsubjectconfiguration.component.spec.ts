import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcademicstandardsubjectconfigurationComponent } from './academicstandardsubjectconfiguration.component';

describe('AcademicstandardsubjectconfigurationComponent', () => {
  let component: AcademicstandardsubjectconfigurationComponent;
  let fixture: ComponentFixture<AcademicstandardsubjectconfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcademicstandardsubjectconfigurationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademicstandardsubjectconfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
