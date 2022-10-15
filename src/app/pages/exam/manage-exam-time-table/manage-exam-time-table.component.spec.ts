import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExamTimeTableComponent } from './manage-exam-time-table.component';

describe('ManageExamTimeTableComponent', () => {
  let component: ManageExamTimeTableComponent;
  let fixture: ComponentFixture<ManageExamTimeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageExamTimeTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageExamTimeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
