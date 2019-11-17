import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../tracking.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  isShakyCustomer: boolean;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.isShakyCustomer = this.route.snapshot.data.isShakyCustomer;
  }
}
