import { Injectable } from '@angular/core';


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

    start() {
        console.log(document.querySelector('[data-aoi]'))
        if (!document.querySelector('[data-aoi]')) {
            return;
        }

        this.id = Date.now();
        // reset aois, one product at a time only for now
        window.localStorage.setItem('aois', JSON.stringify({}));
        
        this.checkVisibleAois();
        this.checkHoveredAois();
        this.trackAoiClicks();
    }

    checkVisibleAois() {
        let options = {
            root: document.querySelector('#content-container'),
            rootMargin: '0px',
            threshold: 0.5
        }
        let callback = (entries, observer) => { 
            entries.forEach(entry => {
                let aoiName = entry.target.getAttribute('data-aoi');

                if (entry.intersectionRatio >= 0.5) {
                    // moved in
                    this.aoiEntries[aoiName] = Date.now();    
                } else {
                    // moved out
                    if (this.aoiEntries[aoiName]) {
                        this.saveVisibleAoiEnd(aoiName);
                    }
                }
            });
        };
          
        let observer = new IntersectionObserver(callback, options);

        document.querySelectorAll('[data-aoi]').forEach(el => {
            observer.observe(el);

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

        document.addEventListener('mousemove', this.createMouseMoveHandler());
    }

    handlePageChange() {
        for (let key in this.aoiEntries) {
            if (this.aoiEntries[key]) {
                this.saveVisibleAoiEnd(key);
            }
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
                clicked: {}
            };
        }

        aois[this.id].visible = this.aoiVisible;
        aois[this.id].hovered = this.aoiHovered;
        aois[this.id].clicked = this.aoiInteracted;

        window.localStorage.setItem('aois', JSON.stringify(aois));
    }
}