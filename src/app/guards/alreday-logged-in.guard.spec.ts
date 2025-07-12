import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { alredayLoggedInGuard } from './alreday-logged-in.guard';

describe('alredayLoggedInGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => alredayLoggedInGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
