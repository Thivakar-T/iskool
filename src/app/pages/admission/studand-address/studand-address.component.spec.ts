import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudandAddressComponent } from './studand-address.component';

describe('StudandAddressComponent', () => {
  let component: StudandAddressComponent;
  let fixture: ComponentFixture<StudandAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudandAddressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudandAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
