import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService, Workout } from '../workout.service';

@Component({
  selector: 'app-workout-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-form.component.html',
  styleUrls: ['./workout-form.component.scss']
})
export class WorkoutFormComponent {
  userName: string = '';
  workoutType: string = '';
  workoutMinutes: number = 0;

  constructor(private workoutService: WorkoutService) {}

  addWorkout() {
    if (this.userName && this.workoutType && this.workoutMinutes > 0) {
      const newWorkout: Workout = {
        id: Date.now(),
        name: this.userName,
        workouts: [{ type: this.workoutType, minutes: this.workoutMinutes }]
      };
      this.workoutService.addWorkout(newWorkout);
      this.resetForm();
    }
  }

  resetForm() {
    this.userName = '';
    this.workoutType = '';
    this.workoutMinutes = 0;
  }
}