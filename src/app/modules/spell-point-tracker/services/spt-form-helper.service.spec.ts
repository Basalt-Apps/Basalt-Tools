import { TestBed } from '@angular/core/testing';

import { SPTFormHelperService } from './spt-form-helper.service';

describe('SPTFormHelperService', () => {
  let service: SPTFormHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SPTFormHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
