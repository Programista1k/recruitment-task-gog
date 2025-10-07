import { ChangeDetectionStrategy, Component, computed, inject, Signal } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { CartDropdown } from '../../../features/cart/components/cart-dropdown/cart-dropdown';
import { CartService } from '../../../features/cart/services/cart.service';
import { Product } from '../../../features/products/models/product.model';

@Component({
  selector: 'app-header',
  imports: [NgOptimizedImage, CartDropdown],
  templateUrl: './header.html',
  styleUrl: './header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  protected cartItems: Signal<Map<string, Product>> = computed(() => this.cartService.cartItems());
  private readonly cartService: CartService = inject(CartService);

  protected clearCart(): void {
    this.cartService.clearCart();
  }

  protected removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
  }
}
