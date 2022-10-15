import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteAllotmentComponent } from './route-allotment.component';

describe('RouteAllotmentComponent', () => {
  let component: RouteAllotmentComponent;
  let fixture: ComponentFixture<RouteAllotmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteAllotmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteAllotmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
