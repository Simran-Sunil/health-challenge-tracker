import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { Chart, registerables } from 'chart.js';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

Chart.register(...registerables);

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), provideAnimationsAsync()
  ]
}).catch(err => console.error(err));