import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../tracking.service';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {
  isShakyCustomer: boolean;

  constructor(private trackingService: TrackingService) { }

  ngOnInit() {
    this.loadModel();
  }
  async loadModel() {
    this.isShakyCustomer = await this.trackingService.predictReturn();
  }
}
