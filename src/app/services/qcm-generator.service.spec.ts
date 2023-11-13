import { TestBed } from '@angular/core/testing';

import { QcmGeneratorService } from './QcmGeneratorService';

describe('QcmGeneratorService', () => {
  let service: QcmGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QcmGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
