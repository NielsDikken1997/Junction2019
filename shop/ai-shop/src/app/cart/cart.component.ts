import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { TrackingService } from '../tracking.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  private model: tf.LayersModel;
  private isShakyCustomer: boolean;
  private data;

  constructor(private trackingService: TrackingService) { }

  ngOnInit() {
    this.loadModel();
  }

  async loadModel() {
    // this.model = await tf.loadLayersModel('/assets/model.json');
    // // console.log(this.model);

    // let trackingData = this.trackingService.generateTrackingSummary();

    // // totaltime, picture_clicks, picture_time, picture_dwell, summary_clicks, summary_time, summary_dwell, descr_clicks, descr_time, descr_dwell, review_clicks, review_time, review_dwell
    // const tensor = tf.tensor([
    //   trackingData['totalTime'],
    //   trackingData['images_click'],
    //   trackingData['images_visible'],
    //   trackingData['images_hover'],
    //   trackingData['summary_click'],
    //   trackingData['summary_visible'],
    //   trackingData['summary_hover'],
    //   trackingData['details_click'],
    //   trackingData['details_visible'],
    //   trackingData['details_hover'],
    //   trackingData['reviews_click'],
    //   trackingData['reviews_visible'],
    //   trackingData['reviews_hover'],
    // ],
    //    [1, 13],'int32');

    // this.data = JSON.stringify(trackingData);
    // const pred = (this.model.predict(tensor) as tf.Tensor).dataSync();
    // console.log(pred);
    // const willReturn = pred.indexOf(Math.min(...pred)) === 1;
    
    this.isShakyCustomer = await this.trackingService.predictReturn();
  }

}
