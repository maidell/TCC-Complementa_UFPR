import { TestBed } from '@angular/core/testing';

import { AnexoService } from './anexo.service';

describe('AnexoService', () => {
  let service: AnexoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnexoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
