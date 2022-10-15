import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteMapingListComponent } from './route-maping-list.component';

describe('RouteMapingListComponent', () => {
  let component: RouteMapingListComponent;
  let fixture: ComponentFixture<RouteMapingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouteMapingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteMapingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
