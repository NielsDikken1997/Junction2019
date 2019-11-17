import { Component, OnInit } from '@angular/core';
import { TrackingService } from '../tracking.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-done',
  templateUrl: './done.component.html',
  styleUrls: ['./done.component.scss']
})
export class DoneComponent implements OnInit {
  isShakyCustomer: boolean;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.isShakyCustomer = this.route.snapshot.data.isShakyCustomer;
  }
}
