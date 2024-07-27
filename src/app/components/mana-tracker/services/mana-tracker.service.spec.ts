import { TestBed } from '@angular/core/testing';

import { ManaTrackerService } from './mana-tracker.service';

describe('ManaTrackerService', () => {
  let service: ManaTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManaTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
