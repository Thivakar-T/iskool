import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaymasterlistComponent } from './daymasterlist.component';

describe('DaymasterlistComponent', () => {
  let component: DaymasterlistComponent;
  let fixture: ComponentFixture<DaymasterlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaymasterlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DaymasterlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
