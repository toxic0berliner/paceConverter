import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaceCardComponent } from './pace-card.component';

describe('PaceCardComponent', () => {
  let component: PaceCardComponent;
  let fixture: ComponentFixture<PaceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaceCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
