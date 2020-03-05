import { TestBed } from '@angular/core/testing';

import { JavaconnService } from './javaconn.service';

describe('JavaconnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JavaconnService = TestBed.get(JavaconnService);
    expect(service).toBeTruthy();
  });
});
