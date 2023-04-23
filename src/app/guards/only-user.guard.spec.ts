import { TestBed } from '@angular/core/testing';

import { OnlyUserGuard } from './only-user.guard';

describe('OnlyUserGuard', () => {
  let guard: OnlyUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OnlyUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
