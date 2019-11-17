import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../tracking.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isShakyCustomer: boolean;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // this.loadModel();
    this.isShakyCustomer = this.route.snapshot.data.isShakyCustomer;
  }
  // async loadModel() {
  //   this.isShakyCustomer = await this.trackingService.predictReturn();
  // }
}
