import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../tracking.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isShakyCustomer: boolean;

  constructor(private trackingService: TrackingService) { }

  ngOnInit() {
    this.loadModel();
  }
  async loadModel() {
    this.isShakyCustomer = await this.trackingService.predictReturn();
  }
}
