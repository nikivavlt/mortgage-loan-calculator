import { TestBed } from '@angular/core/testing';

import { RedirectToHomepageService } from './redirect-to-homepage.service';

describe('RedirectToHomepageService', () => {
  let service: RedirectToHomepageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedirectToHomepageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
