import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentacademicRecordComponent } from './studentacademic-record.component';

describe('StudentacademicRecordComponent', () => {
  let component: StudentacademicRecordComponent;
  let fixture: ComponentFixture<StudentacademicRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentacademicRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentacademicRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
