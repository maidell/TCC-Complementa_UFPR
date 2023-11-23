import { TestBed } from '@angular/core/testing';

import { ContestacaoService } from './contestacao.service';

describe('ContestacaoService', () => {
  let service: ContestacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContestacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
