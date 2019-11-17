import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../tracking.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  private isShakyCustomer: boolean;

  constructor(private trackingService: TrackingService) { }

  ngOnInit() {
    this.loadModel();
  }
  async loadModel() {
    this.isShakyCustomer = await this.trackingService.predictReturn();
  }
}
