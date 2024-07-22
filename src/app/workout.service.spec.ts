import { TestBed } from '@angular/core/testing';
import { WorkoutService, Workout } from './workout.service';
import { BehaviorSubject } from 'rxjs';

describe('WorkoutService', () => {
  let service: WorkoutService;
  let mockLocalStorage: { [key: string]: string };

  beforeEach(() => {
    mockLocalStorage = {};
    spyOn(localStorage, 'getItem').and.callFake((key: string): string => {
      return mockLocalStorage[key];
    });
    spyOn(localStorage, 'setItem').and.callFake((key: string, value: string) => {
      mockLocalStorage[key] = value;
    });

    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load workouts from localStorage if available', () => {
    const storedWorkouts = JSON.stringify([
      {
        id: 4,
        name: 'Stored User',
        workouts: [
          { type: 'Jumping', minutes: 15 }
        ]
      }
    ]);
    mockLocalStorage['workouts'] = storedWorkouts;

    const newService = new WorkoutService();
    newService.getWorkouts().subscribe(workouts => {
      expect(workouts.length).toBe(1);
      expect(workouts[0].name).toBe('Stored User');
    });
  });

  it('should get all workouts', (done: DoneFn) => {
    service.getWorkouts().subscribe(workouts => {
      expect(workouts.length).toBe(3);
      done();
    });
  });

  it('should add a new workout and update the list', (done: DoneFn) => {
    const newWorkout: Workout = {
      id: 4,
      name: 'New User',
      workouts: [{ type: 'Dancing', minutes: 20 }]
    };

    service.addWorkout(newWorkout);
    service.getWorkouts().subscribe(workouts => {
      expect(workouts.length).toBe(4);
      expect(workouts[3].name).toBe('New User');
      done();
    });
  });

  it('should save workouts to localStorage when updated', () => {
    const newWorkout: Workout = {
      id: 4,
      name: 'New User',
      workouts: [{ type: 'Dancing', minutes: 20 }]
    };

    service.addWorkout(newWorkout);
    expect(mockLocalStorage['workouts']).toBe(JSON.stringify(service['workouts']));
  });

  it('should not load from localStorage if not available', (done: DoneFn) => {
    const newService = new WorkoutService();
    newService.getWorkouts().subscribe(workouts => {
      expect(workouts.length).toBe(3); // default workouts length
      done();
    });
  });
});
