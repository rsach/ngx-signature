import { TestBed, inject } from '@angular/core/testing';

import { NgxSignatureService } from './ngx-signature.service';

describe('NgxSignatureService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxSignatureService]
    });
  });

  it('should be created', inject([NgxSignatureService], (service: NgxSignatureService) => {
    expect(service).toBeTruthy();
  }));
});
