import { Component, OnInit, Input } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
// import deepModel from '../../assets/model.json';

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
    // const model = tf.loadLayersModel(deepModel);
    // const merged = [["TotalTime",	"PictureClicks",	"PictureTime",	"PictureDwelling", "SummaryClicks",	"SummaryTime", "SummaryDwelling", "DescriptionClicks",	"DescriptionTime",	"DescriptionDwelling",	"ReviewClicks",	"ReviewTime", "ReviewDwelling"], [76844, 4,	17495,	4222,	1,	24315,	8835,	4,	18848,	17426,	3,	646,	646]];
    // console.log(merged);
    console.log(this.model);

  }
  async loadModel() {
    this.model = await tf.loadLayersModel('../../assets/model.json');
  }

}
