import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WorkoutListComponent } from './workout-list.component';
import { WorkoutService } from '../workout.service';
import { of } from 'rxjs';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let mockWorkoutService: jasmine.SpyObj<WorkoutService>;

  beforeEach(async () => {
    mockWorkoutService = jasmine.createSpyObj('WorkoutService', ['getWorkouts']);

    await TestBed.configureTestingModule({
      imports: [WorkoutListComponent],
      providers: [
        { provide: WorkoutService, useValue: mockWorkoutService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load workouts on init', () => {
    const mockWorkouts = [
      { id: 1, name: 'John', workouts: [{ type: 'Running', minutes: 30 }] }
    ];
    mockWorkoutService.getWorkouts.and.returnValue(of(mockWorkouts));

    fixture.detectChanges();

    expect(component.workouts).toEqual(mockWorkouts);
  });

  // Add more tests to cover all component functionality
});