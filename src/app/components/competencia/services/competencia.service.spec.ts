import { TestBed } from '@angular/core/testing';

import { CompetenciaService } from './competencia.service';

describe('CompetenciaService', () => {
  let service: CompetenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompetenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
