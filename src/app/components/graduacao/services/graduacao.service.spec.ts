import { TestBed } from '@angular/core/testing';

import { GraduacaoService } from './graduacao.service';

describe('GraduacaoService', () => {
  let service: GraduacaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraduacaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
