import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastcheckComponent } from './lastcheck.component';

describe('LastcheckComponent', () => {
  let component: LastcheckComponent;
  let fixture: ComponentFixture<LastcheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastcheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
