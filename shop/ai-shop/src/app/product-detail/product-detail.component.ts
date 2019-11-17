import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  checkout = false;
  review = 2;
  productDetails = 1;


  constructor() { }

  ngOnInit() {
  }

}
