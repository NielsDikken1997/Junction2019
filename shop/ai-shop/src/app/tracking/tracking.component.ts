import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {

  aois = [];
  aoiHover = {};
  aoiVisible = {};
  aoiClick = {};
  pageDuration = 0;

  fullData = "";
  csvData = "";

  constructor() { }

  ngOnInit() {
    let csvData = "id,images_visible,images_hover,images_click,summary_visible,summary_hover,summary_click,details_visible,details_hover,details_click,reviews_visible,reviews_hover,reviews_click,totalTime\n";

    if (window.localStorage.getItem('train_data')) {
      csvData = window.localStorage.getItem('train_data');
    }

    // TODO: use tracking service
    let aoiDataRaw = JSON.parse(window.localStorage.getItem('aois'));
    let aoiData: any = Object.values(aoiDataRaw)[0];

    let fullData = {};
    let csvRow = Object.keys(aoiDataRaw)[0] + ",";

    for (let key in aoiData.visible) {
      this.aois.push(key);
      if (aoiData.visible[key]) {
        let duration = aoiData.visible[key].reduce((prev, item) => prev + item.duration, 0);
        this.aoiVisible[key] = duration;
      }
      if (aoiData.hovered[key]) {
        let duration = aoiData.hovered[key].reduce((prev, item) => prev + item.duration, 0);
        this.aoiHover[key] = duration;
      }
      if (aoiData.clicked[key]) {
        let duration = aoiData.clicked[key];
        this.aoiClick[key] = duration;
      }

      this.pageDuration = aoiData.duration;

      fullData[key + '_visible'] = this.aoiVisible[key] || 0;
      fullData[key + '_hover'] = this.aoiHover[key] || 0;
      fullData[key + '_click'] = this.aoiClick[key] || 0;
      csvRow += fullData[key + '_visible'] + "," + fullData[key + '_hover'] + "," + fullData[key + '_click'] + ",";
    }
    fullData['totalTime'] = this.pageDuration;
    csvRow += this.pageDuration + "\n";

    this.fullData = JSON.stringify(fullData);

    if (csvData.indexOf(csvRow) == -1) {
      csvData += csvRow;
      window.localStorage.setItem('train_data', csvData);
    }
    this.csvData = csvData;
  }

  clearCsvData() {
    window.localStorage.setItem('train_data', "");
  }
}
