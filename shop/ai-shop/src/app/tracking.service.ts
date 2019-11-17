import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';

@Injectable({
    providedIn: 'root',
})

export class TrackingService {
    private interval: any;

    private aoiVisible: any = {};
    private aoiEntries: any = {};

    private aoiHovered: any = {};
    private aoiHoveredEntries: any = {};

    private aoiInteracted: any = {};

    private id: number;

    private checkInterval: number = 100;

    private startTime: number = 0;
    private pageDuration: number = 0;

    private mouseMoveListener: any;
    private observer: any;

    start() {
        console.log(document.querySelector('[data-aoi]'))
        if (!document.querySelector('[data-aoi]')) {
            return;
        }
        this.model = null;

        this.pageDuration = 0;
        this.id = Date.now();
        this.startTime = Date.now();
        // reset aois, one product at a time only for now
        window.localStorage.setItem('aois', JSON.stringify({}));
        
        this.checkVisibleAois();
        this.checkHoveredAois();
        this.trackAoiClicks();
    }

    checkVisibleAois() {
        let options = {
            threshold: 0.5
        }
        let callback = (entries, observer) => { 
            entries.forEach(entry => {
                let aoiName = entry.target.getAttribute('data-aoi');

                if (entry.intersectionRatio >= 0.5) {
                    // moved in
                    console.log(`${aoiName} visible`);
                    this.aoiEntries[aoiName] = Date.now();    
                } else {
                    // moved out
                    if (this.aoiEntries[aoiName]) {
                        this.saveVisibleAoiEnd(aoiName);
                    }
                }
            });
        };
          
        this.observer = new IntersectionObserver(callback, options);

        document.querySelectorAll('[data-aoi]').forEach(el => {
            this.observer.observe(el);

            let aoiName = el.getAttribute('data-aoi');

            this.aoiVisible[aoiName] = [];
            this.aoiEntries[aoiName] = null;
        });
    }

    saveVisibleAoiEnd(aoiName) {
        let timeInside = Date.now() - this.aoiEntries[aoiName];

        this.aoiVisible[aoiName].push({
            start: this.aoiEntries[aoiName],
            duration: timeInside
        });

        this.aoiEntries[aoiName] = null;

        this.save();
    }

    checkHoveredAois() {
        document.querySelectorAll('[data-aoi]').forEach(el => {
            let aoiName = el.getAttribute('data-aoi');

            this.aoiHovered[aoiName] = [];
            this.aoiHoveredEntries[aoiName] = null;
        });

        this.mouseMoveListener = this.createMouseMoveHandler();

        document.addEventListener('mousemove', this.mouseMoveListener);
    }

    handlePageChange() {
        for (let key in this.aoiEntries) {
            if (this.aoiEntries[key]) {
                this.saveVisibleAoiEnd(key);
            }
        }

        if (this.startTime) {
            this.pageDuration = Date.now() - this.startTime;
            document.removeEventListener('mousemove', this.mouseMoveListener);
            this.save();
        }
        
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    createMouseMoveHandler() {
        let lastCheck = 0;

        return (ev) => {
            let now = Date.now();
            if (now - lastCheck < this.checkInterval) {
                return;
            }
            lastCheck = now;

            this.checkMousePosition(ev.x, ev.y);
            this.save();
        };
    }

    checkMousePosition(x, y) {
        let found = null;
        document.querySelectorAll('[data-aoi]').forEach(el => {
            if (found) {
                return;
            }
            
            let aoiName = el.getAttribute('data-aoi');
            let elPos = this.getElementsPosition(el);

            if (x >= elPos.left && x <= elPos.right && y >= elPos.top && y <= elPos.bottom) {
                found = aoiName;

                if (!this.aoiHoveredEntries[aoiName]) {
                    this.aoiHoveredEntries[aoiName] = Date.now();
                }
            }
        });

        for (let aoi in this.aoiHoveredEntries) {
            if (aoi == found) {
                return;
            }

            if (this.aoiHoveredEntries[aoi]) {
                this.aoiHovered[aoi].push({
                    start: this.aoiHoveredEntries[aoi],
                    duration: Date.now() - this.aoiHoveredEntries[aoi] - this.checkInterval/2
                });
                this.aoiHoveredEntries[aoi] = null;
            }
        }

    }

    getElementsPosition(el) {
        let rect = el.getBoundingClientRect();
        let win = el.ownerDocument.defaultView;

        return {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset,
            bottom: rect.top + win.pageYOffset + rect.height,
            right: rect.left + win.pageXOffset + rect.width
        };
    }

    trackAoiClicks() {
        document.querySelectorAll('[data-aoi]').forEach(el => {
            let aoiName = el.getAttribute('data-aoi');

            this.aoiInteracted[aoiName] = 0;

            el.querySelectorAll('[data-aoi-click]').forEach(clickEl => {
                clickEl.addEventListener('click', ev => {
                    this.aoiInteracted[aoiName]++;
                    this.save()
                });
            });
        });

    }

    save() {
        let aois = JSON.parse(window.localStorage.getItem('aois'));
        if (!aois[this.id]) {
            aois[this.id] = {
                visible: {},
                hovered: {},
                clicked: {},
                duration: 0
            };
        }

        aois[this.id].visible = this.aoiVisible;
        aois[this.id].hovered = this.aoiHovered;
        aois[this.id].clicked = this.aoiInteracted;
        aois[this.id].duration = this.pageDuration;

        console.log("Duration ", this.pageDuration)

        window.localStorage.setItem('aois', JSON.stringify(aois));
    }

    generateTrackingSummary() {
        let aoiDataRaw = JSON.parse(window.localStorage.getItem('aois'));
        let aoiData: any = Object.values(aoiDataRaw)[0];

        let fullData = {};
        console.log(aoiData);

        for (let key in aoiData.visible) {
            fullData[key + '_visible'] = 0;
            fullData[key + '_hover'] = 0;
            fullData[key + '_click'] = 0;
            if (aoiData.visible[key]) {
                let duration = aoiData.visible[key].reduce((prev, item) => prev + item.duration, 0);
                fullData[key + '_visible'] = duration || 0;
            }
            if (aoiData.hovered[key]) {
                let duration = aoiData.hovered[key].reduce((prev, item) => prev + item.duration, 0);
                fullData[key + '_hover'] = duration || 0;
            }
            if (aoiData.clicked[key]) {
                let duration = aoiData.clicked[key];
                fullData[key + '_click'] = duration || 0;
            }

            this.pageDuration = aoiData.duration;
        }
        fullData['totalTime'] = this.pageDuration;

        return fullData;
    }

    private model: tf.LayersModel;
    private willReturn;
    async predictReturn() {
        if (this.model) {
            return this.willReturn;
        }
        
        this.model = await tf.loadLayersModel('/assets/model.json');
        // console.log(this.model);

        let trackingData = this.generateTrackingSummary();

        // totaltime, picture_clicks, picture_time, picture_dwell, summary_clicks, summary_time, summary_dwell, descr_clicks, descr_time, descr_dwell, review_clicks, review_time, review_dwell
        const tensor = tf.tensor([
        trackingData['totalTime'],
        trackingData['images_click'],
        trackingData['images_visible'],
        trackingData['images_hover'],
        trackingData['summary_click'],
        trackingData['summary_visible'],
        trackingData['summary_hover'],
        trackingData['details_click'],
        trackingData['details_visible'],
        trackingData['details_hover'],
        trackingData['reviews_click'],
        trackingData['reviews_visible'],
        trackingData['reviews_hover'],
        ],
        [1, 13],'int32');

        const pred = (this.model.predict(tensor) as tf.Tensor).dataSync();
        // console.log(pred);
        this.willReturn = pred.indexOf(Math.min(...pred)) === 1;
        
        return this.willReturn;
    }

}