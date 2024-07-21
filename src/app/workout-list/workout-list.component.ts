import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WorkoutService, Workout } from '../workout.service';

@Component({
  selector: 'app-workout-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-list.component.html',
  styleUrls: ['./workout-list.component.scss']
})
export class WorkoutListComponent implements OnInit {
  workouts: Workout[] = [];
  filteredWorkouts: Workout[] = [];
  searchTerm: string = '';
  workoutTypeFilter: string = 'All';
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workoutService.getWorkouts().subscribe(workouts => {
      this.workouts = workouts;
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredWorkouts = this.workouts.filter(workout => {
      const nameMatch = workout.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const typeMatch = this.workoutTypeFilter === 'All' || workout.workouts.some(w => w.type === this.workoutTypeFilter);
      return nameMatch && typeMatch;
    });
  }

  getTotalWorkoutMinutes(workout: Workout): number {
    return workout.workouts.reduce((total, w) => total + w.minutes, 0);
  }

  getWorkoutTypes(workout: Workout): string {
    return workout.workouts.map(w => w.type).join(', ');
  }
}