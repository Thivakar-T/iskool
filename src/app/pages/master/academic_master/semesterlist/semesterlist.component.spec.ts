import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterlistComponent } from './semesterlist.component';

describe('SemesterlistComponent', () => {
  let component: SemesterlistComponent;
  let fixture: ComponentFixture<SemesterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SemesterlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SemesterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
