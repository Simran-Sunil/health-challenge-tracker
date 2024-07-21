import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { WorkoutService, Workout } from '../workout.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartConfiguration, registerables} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-workout-chart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.scss']
})
export class WorkoutChartComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  workouts: Workout[] = [];
  selectedUser: string = '';
  chart: Chart | null = null;

  constructor(private workoutService: WorkoutService) {}

  ngOnInit() {
    this.workoutService.getWorkouts().subscribe(workouts => {
      console.log('Workouts loaded:', workouts);
      this.workouts = workouts;
      if (this.workouts.length > 0) {
        this.selectedUser = this.workouts[0].name;
        //this.updateChart();
      }
    });
  }

  ngAfterViewInit() {
    if (this.selectedUser) {
      this.updateChart();
    }
  }

  ngOnDestroy() {
    this.destroyChart();
  }

  updateChart() {
    console.log('Updating chart for user:', this.selectedUser);
    const user = this.workouts.find(w => w.name === this.selectedUser);
    if (user && this.chartCanvas) {
      console.log('User data:', user);
      const labels = user.workouts.map(w => w.type);
      const data = user.workouts.map(w => w.minutes);

      console.log('Chart labels:', labels);
      console.log('Chart data:', data);

      this.destroyChart();

      const ctx = this.chartCanvas.nativeElement.getContext('2d');
      if (ctx) {
        const config: ChartConfiguration = {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Minutes',
              data: data,
              backgroundColor: 'rgba(54, 162, 235, 0.5)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        };

        this.chart = new Chart(ctx, config);
        console.log('Chart created:', this.chart);
      } else {
        console.error('Unable to get 2D context from canvas');
      }
    } else {
      console.log('User not found or canvas not available:', this.selectedUser);
    }
  }

  private destroyChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }
}