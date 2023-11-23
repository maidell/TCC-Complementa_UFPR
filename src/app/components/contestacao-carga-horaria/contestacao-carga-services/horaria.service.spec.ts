import { TestBed } from '@angular/core/testing';

import { HorariaService } from './horaria.service';

describe('HorariaService', () => {
  let service: HorariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HorariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
