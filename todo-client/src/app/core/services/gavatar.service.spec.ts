import { TestBed } from '@angular/core/testing';

import { GavatarService } from './gavatar.service';

describe('GavatarService', () => {
  let service: GavatarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GavatarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
