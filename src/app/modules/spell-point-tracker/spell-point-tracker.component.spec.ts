import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpellPointTrackerComponent } from './spell-point-tracker.component';

describe('SpellPointTrackerComponent', () => {
  let component: SpellPointTrackerComponent;
  let fixture: ComponentFixture<SpellPointTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpellPointTrackerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpellPointTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
