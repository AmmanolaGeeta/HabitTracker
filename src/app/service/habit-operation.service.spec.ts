import { TestBed } from '@angular/core/testing';

import { HabitOperationService } from './habit-operation.service';

describe('HabitOperationService', () => {
  let service: HabitOperationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabitOperationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
