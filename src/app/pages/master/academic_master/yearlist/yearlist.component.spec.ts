import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlistComponent } from './yearlist.component';

describe('YearlistComponent', () => {
  let component: YearlistComponent;
  let fixture: ComponentFixture<YearlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YearlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YearlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
