import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProductService} from '../services/product.service';
import {FilterServiceService} from '../services/filter-service.service';
import {Category} from '../models/Category';
import {Producer} from '../models/Producer';
import {ActivatedRoute} from '@angular/router';
import {typeIsOrHasBaseType} from 'tslint/lib/language/typeUtils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  category: Category[] = [];
  producer: Producer[] = [];
  isOpen = true;
  selectedProduct: any;
  countOfProduct: any = null;

  constructor(
    private productService: ProductService,
    private filterService: FilterServiceService,
    private router: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.getWishList();
    this.productService.getAllCategory().subscribe((category) => {
      this.category = category;
    });
  }

  getWishList() {
    this.countOfProduct = JSON.parse(localStorage.getItem('wishList')).length;
    this.filterService.wishList.subscribe(res => {
      this.countOfProduct += res;
      console.log(this.countOfProduct);
    });
  }

  closeMenu() {
    this.isOpen = !this.isOpen;
  }

  searchAllProduct(form: NgForm) {
    const product = form.value;
    this.selectedProduct = product.brand;
  }
}
