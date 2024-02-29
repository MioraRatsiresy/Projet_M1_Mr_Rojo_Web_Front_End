import { TestBed } from '@angular/core/testing';

import { DeviceRegistryService } from './device-registry.service';

describe('DeviceRegistryService', () => {
  let service: DeviceRegistryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceRegistryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
