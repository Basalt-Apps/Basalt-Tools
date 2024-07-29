import { TestBed } from '@angular/core/testing';

import { ManaTrackerFormHelperService } from './mana-tracker-form-helper.service';

describe('ManaTrackerFormHelperService', () => {
  let service: ManaTrackerFormHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManaTrackerFormHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
