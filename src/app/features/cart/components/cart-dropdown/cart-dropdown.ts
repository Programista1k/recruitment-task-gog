import {Component, computed, input, InputSignal, Signal} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {Product} from '../../../products/models/product.model';

@Component({
  selector: 'app-cart-dropdown',
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './cart-dropdown.html',
  styleUrl: './cart-dropdown.css'
})
export class CartDropdown {
  public cartItems: InputSignal<Map<string, Product>> = input.required();

  protected cartItemsCount: Signal<number> = computed(() => this.cartItems().size);
}
