import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotherTongeComponent } from './mother-tonge.component';

describe('MotherTongeComponent', () => {
  let component: MotherTongeComponent;
  let fixture: ComponentFixture<MotherTongeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MotherTongeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MotherTongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
