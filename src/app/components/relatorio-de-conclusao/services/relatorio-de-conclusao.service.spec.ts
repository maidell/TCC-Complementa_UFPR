import { TestBed } from '@angular/core/testing';

import { RelatorioDeConclusaoService } from './relatorio-de-conclusao.service';

describe('RelatorioDeConclusaoService', () => {
  let service: RelatorioDeConclusaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RelatorioDeConclusaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
