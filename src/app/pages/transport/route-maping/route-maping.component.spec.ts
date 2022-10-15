import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteMapingComponent } from './route-maping.component';

describe('RouteMapingComponent', () => {
  let component: RouteMapingComponent;
  let fixture: ComponentFixture<RouteMapingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteMapingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteMapingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
