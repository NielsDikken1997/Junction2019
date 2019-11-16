import { Component, OnInit, Input } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    model: tf.LayersModel;
    constructor() { }

  ngOnInit() {
      this.loadModel();
  }
  async loadModel() {
    this.model = await tf.loadLayersModel('/assets/model.json');
    console.log(this.model);
    const tensor = tf.tensor([60422,	11,	12630,	9829,	4,	9778,	2452,	6,	18888,	2072,	0,	13000,	9000], [1, 13],'int32');

    const pred = this.model.predict(tensor).dataSync();
    // console.log(this.model.predict(tensor).dataSync());
    const willReturn = pred.indexOf(Math.min(...pred)) === 1;
    console.log(willReturn);
  }

}
