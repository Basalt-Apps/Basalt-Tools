import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManaTrackerComponent } from './mana-tracker.component';

describe('ManaTrackerComponent', () => {
  let component: ManaTrackerComponent;
  let fixture: ComponentFixture<ManaTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManaTrackerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManaTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
