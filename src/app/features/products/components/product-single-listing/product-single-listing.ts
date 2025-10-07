import {Component, computed, input, InputSignal, output, OutputEmitterRef, Signal} from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {Product} from '../../models/product.model';

@Component({
  selector: 'app-product-single-listing',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './product-single-listing.html',
  styleUrl: './product-single-listing.css'
})
export class ProductSingleListing {
  public product: InputSignal<Product> = input.required();
  public cartItemsIds: InputSignal<string[]> = input<string[]>([]);
  public addToCart: OutputEmitterRef<Product> = output();
  
  protected isInCart: Signal<boolean> = computed(() => this.cartItemsIds().includes(this.product().id));
}
