import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RollNumberreportComponent } from './roll-numberreport.component';

describe('RollNumberreportComponent', () => {
  let component: RollNumberreportComponent;
  let fixture: ComponentFixture<RollNumberreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RollNumberreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RollNumberreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
