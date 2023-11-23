import { TestBed } from '@angular/core/testing';

import { ComplexidadeService } from './complexidade.service';

describe('ComplexidadeService', () => {
  let service: ComplexidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComplexidadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
