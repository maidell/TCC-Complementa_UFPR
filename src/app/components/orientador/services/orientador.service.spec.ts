import { TestBed } from '@angular/core/testing';

import { OrientadorService } from './orientador.service';

describe('OrientadorService', () => {
  let service: OrientadorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrientadorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
