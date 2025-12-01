import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard';
import { PopulationService } from '../services/population';
import { of } from 'rxjs';
import { Country } from '../models/country';
import { PopulationRecord } from '../models/population-record';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockPopulationService: Partial<PopulationService>;

  beforeEach(async () => {
    // Mock the service
    mockPopulationService = {
      getPopulationData: () => of([] as PopulationRecord[]),
      getCountriesData: () => of([] as Country[]),
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent], // standalone component
      providers: [{ provide: PopulationService, useValue: mockPopulationService }],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // initialize template and bindings
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
