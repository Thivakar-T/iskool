import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeCollectionCounterComponent } from './fee-collection-counter.component';

describe('FeeCollectionCounterComponent', () => {
  let component: FeeCollectionCounterComponent;
  let fixture: ComponentFixture<FeeCollectionCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeeCollectionCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeCollectionCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
