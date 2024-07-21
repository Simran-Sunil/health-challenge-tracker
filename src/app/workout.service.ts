import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Workout {
  id: number;
  name: string;
  workouts: { type: string; minutes: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private workouts: Workout[] = [
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
    },
    {
      id: 3,
      name: 'Mike Johnson',
      workouts: [
        { type: 'Yoga', minutes: 50 },
        { type: 'Cycling', minutes: 40 }
      ]
    }
  ];

  private workoutsSubject = new BehaviorSubject<Workout[]>(this.workouts);

  constructor() {
    this.loadFromLocalStorage();
  }

  getWorkouts() {
    return this.workoutsSubject.asObservable();
  }

  addWorkout(workout: Workout) {
    this.workouts.push(workout);
    this.updateWorkouts();
  }

  private updateWorkouts() {
    this.workoutsSubject.next(this.workouts);
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.workouts));
  }

  private loadFromLocalStorage() {
    const storedWorkouts = localStorage.getItem('workouts');
    if (storedWorkouts) {
      this.workouts = JSON.parse(storedWorkouts);
      this.updateWorkouts();
    }
  }
}