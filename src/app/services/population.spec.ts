import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PopulationService } from './population';

describe('PopulationService', () => {
  let service: PopulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PopulationService,
        provideHttpClientTesting(), // replaces HttpClientTestingModule
      ],
    });
    service = TestBed.inject(PopulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
