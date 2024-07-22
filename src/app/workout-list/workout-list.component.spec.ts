import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { WorkoutListComponent } from './workout-list.component';
import { WorkoutService, Workout } from '../workout.service';

describe('WorkoutListComponent', () => {
  let component: WorkoutListComponent;
  let fixture: ComponentFixture<WorkoutListComponent>;
  let mockWorkoutService: jasmine.SpyObj<WorkoutService>;

  const mockWorkouts: Workout[] = [
    {
      id: 1,
      name: 'John Doe',
      workouts: [
        { type: 'Running', minutes: 30 },
        { type: 'Cycling', minutes: 45 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      workouts: [
        { type: 'Swimming', minutes: 60 },
        { type: 'Running', minutes: 20 }
      ]
    }
  ];

  beforeEach(async () => {
    mockWorkoutService = jasmine.createSpyObj('WorkoutService', ['getWorkouts']);
    mockWorkoutService.getWorkouts.and.returnValue(of(mockWorkouts));

    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, WorkoutListComponent],
      providers: [{ provide: WorkoutService, useValue: mockWorkoutService }]
    }).compileComponents();

    fixture = TestBed.createComponent(WorkoutListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize workouts on ngOnInit', () => {
    expect(component.workouts).toEqual(mockWorkouts);
    expect(component.filteredWorkouts).toEqual(mockWorkouts);
  });

  it('should filter workouts by name and type', () => {
    component.searchTerm = 'Jane';
    component.workoutTypeFilter = 'Running';
    component.applyFilters();

    expect(component.filteredWorkouts.length).toBe(1);
    expect(component.filteredWorkouts[0].name).toBe('Jane Smith');

    component.searchTerm = 'John';
    component.workoutTypeFilter = 'Cycling';
    component.applyFilters();

    expect(component.filteredWorkouts.length).toBe(1);
    expect(component.filteredWorkouts[0].name).toBe('John Doe');
  });

  it('should calculate total workout minutes', () => {
    const totalMinutes = component.getTotalWorkoutMinutes(mockWorkouts[0]);
    expect(totalMinutes).toBe(75);
  });

  it('should return a comma-separated list of workout types', () => {
    const workoutTypes = component.getWorkoutTypes(mockWorkouts[1]);
    expect(workoutTypes).toBe('Swimming, Running');
  });

  it('should return all workouts if the filter is set to "All"', () => {
    component.searchTerm = '';
    component.workoutTypeFilter = 'All';
    component.applyFilters();

    expect(component.filteredWorkouts.length).toBe(2);
  });

  it('should return workouts that match the search term regardless of case', () => {
    component.searchTerm = 'john';
    component.workoutTypeFilter = 'All';
    component.applyFilters();

    expect(component.filteredWorkouts.length).toBe(1);
    expect(component.filteredWorkouts[0].name).toBe('John Doe');
  });

  it('should update filteredWorkouts when applyFilters is called', () => {
    component.searchTerm = 'Jane';
    component.workoutTypeFilter = 'All';
    component.applyFilters();

    expect(component.filteredWorkouts.length).toBe(1);
    expect(component.filteredWorkouts[0].name).toBe('Jane Smith');
  });
});
