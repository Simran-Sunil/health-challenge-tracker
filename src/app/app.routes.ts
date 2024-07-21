import { Routes } from '@angular/router';
import { WorkoutListComponent } from './workout-list/workout-list.component';
import { WorkoutFormComponent } from './workout-form/workout-form.component';
import { WorkoutChartComponent } from './workout-chart/workout-chart.component';

export const routes: Routes = [
  { path: '', redirectTo: '/workouts', pathMatch: 'full' },
  { path: 'workouts', component: WorkoutListComponent },
  { path: 'add-workout', component: WorkoutFormComponent },
  { path: 'progress', component: WorkoutChartComponent },
];