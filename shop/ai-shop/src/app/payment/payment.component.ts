import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../tracking.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  private isShakyCustomer: boolean;

  constructor(private trackingService: TrackingService) { }

  ngOnInit() {
    this.loadModel();
  }
  async loadModel() {
    this.isShakyCustomer = await this.trackingService.predictReturn();
  }
}
