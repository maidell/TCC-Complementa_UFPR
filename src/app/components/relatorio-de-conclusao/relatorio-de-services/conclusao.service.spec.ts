import { TestBed } from '@angular/core/testing';

import { ConclusaoService } from './conclusao.service';

describe('ConclusaoService', () => {
  let service: ConclusaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConclusaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
