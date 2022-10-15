import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultPublishComponent } from './result-publish.component';

describe('ResultPublishComponent', () => {
  let component: ResultPublishComponent;
  let fixture: ComponentFixture<ResultPublishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultPublishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
