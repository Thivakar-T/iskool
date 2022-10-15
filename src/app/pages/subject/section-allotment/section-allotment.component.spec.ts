import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionAllotmentComponent } from './section-allotment.component';

describe('SectionAllotmentComponent', () => {
  let component: SectionAllotmentComponent;
  let fixture: ComponentFixture<SectionAllotmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionAllotmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
