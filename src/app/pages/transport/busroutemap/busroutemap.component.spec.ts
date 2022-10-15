import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusroutemapComponent } from './busroutemap.component';

describe('BusroutemapComponent', () => {
  let component: BusroutemapComponent;
  let fixture: ComponentFixture<BusroutemapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusroutemapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusroutemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
