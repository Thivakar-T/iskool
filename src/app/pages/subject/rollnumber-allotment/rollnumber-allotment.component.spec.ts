import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollnumberAllotmentComponent } from './rollnumber-allotment.component';

describe('RollnumberAllotmentComponent', () => {
  let component: RollnumberAllotmentComponent;
  let fixture: ComponentFixture<RollnumberAllotmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollnumberAllotmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RollnumberAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
