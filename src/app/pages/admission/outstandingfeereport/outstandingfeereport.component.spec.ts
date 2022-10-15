import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutstandingfeereportComponent } from './outstandingfeereport.component';

describe('OutstandingfeereportComponent', () => {
  let component: OutstandingfeereportComponent;
  let fixture: ComponentFixture<OutstandingfeereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OutstandingfeereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OutstandingfeereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
