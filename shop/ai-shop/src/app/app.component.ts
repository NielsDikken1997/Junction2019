import { Component } from '@angular/core';
import { TrackingService } from './tracking.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter }                from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ai-shop';

  constructor(private trackingService: TrackingService, private router: Router) {}

  ngOnInit() {

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        setTimeout(() => {
          this.trackingService.start();
        }, 100);
        
      });

    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => {
        this.trackingService.handlePageChange();
      })
  }
}
