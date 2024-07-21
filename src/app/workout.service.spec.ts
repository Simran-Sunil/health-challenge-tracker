import { TestBed } from '@angular/core/testing';
import { WorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: WorkoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return workouts', (done) => {
    service.getWorkouts().subscribe(workouts => {
      expect(workouts.length).toBeGreaterThan(0);
      done();
    });
  });

  it('should add a workout', (done) => {
    const newWorkout = { id: 4, name: 'Test User', workouts: [{ type: 'Yoga', minutes: 60 }] };
    service.addWorkout(newWorkout);
    service.getWorkouts().subscribe(workouts => {
      expect(workouts.some(w => w.id === 4)).toBeTruthy();
      done();
    });
  });

  // Add more tests to cover all service functionality
});