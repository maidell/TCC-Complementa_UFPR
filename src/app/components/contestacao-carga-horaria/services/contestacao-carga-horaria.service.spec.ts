import { TestBed } from '@angular/core/testing';

import { ContestacaoCargaHorariaService } from './contestacao-carga-horaria.service';

describe('ContestacaoCargaHorariaService', () => {
  let service: ContestacaoCargaHorariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestacaoCargaHorariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
