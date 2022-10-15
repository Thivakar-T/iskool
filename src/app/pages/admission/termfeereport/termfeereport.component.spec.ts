import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermfeereportComponent } from './termfeereport.component';

describe('TermfeereportComponent', () => {
  let component: TermfeereportComponent;
  let fixture: ComponentFixture<TermfeereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TermfeereportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermfeereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
