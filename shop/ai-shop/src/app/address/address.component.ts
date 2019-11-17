import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../tracking.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  isShakyCustomer: boolean;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.isShakyCustomer = this.route.snapshot.data.isShakyCustomer;
  }
}
