import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAcademicViewComponent } from './student-academic-view.component';

describe('StudentAcademicViewComponent', () => {
  let component: StudentAcademicViewComponent;
  let fixture: ComponentFixture<StudentAcademicViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentAcademicViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAcademicViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
