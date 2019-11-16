import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {


  private aois = [];
  private aoiHover = {};
  private aoiVisible = {};
  private aoiClick = {};

  constructor() { }

  ngOnInit() {
    let aoiData = JSON.parse(window.localStorage.getItem('aois'));
    aoiData = Object.values(aoiData)[0];

    for (let key in aoiData.visible) {
      this.aois.push(key);
      if (!aoiData.visible[key]) {
        continue;
      }
      let duration = aoiData.visible[key].reduce((prev, item) => prev + item.duration, 0);
      
      this.aoiVisible[key] = duration;
    }
    for (let key in aoiData.hovered) {
      if (!aoiData.hovered[key]) {
        continue;
      }
      let duration = aoiData.hovered[key].reduce((prev, item) => prev + item.duration, 0);
      
      this.aoiHover[key] = duration;
    }
    for (let key in aoiData.clicked) {
      if (!aoiData.clicked[key]) {
        continue;
      }
      let duration = aoiData.clicked[key].reduce((prev, item) => prev + item.duration, 0);
      
      this.aoiClick[key] = duration;
    }

  }

}
