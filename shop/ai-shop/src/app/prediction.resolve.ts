import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/delay';
import { TrackingService } from './tracking.service';

@Injectable()
export class PredictionResolver implements Resolve<any> {
  constructor(private trackingService: TrackingService) {}

  resolve() {
    let promise = new Promise((resolve, reject) => {
        resolve(this.trackingService.predictReturn());
    });

    return promise;
  }
}