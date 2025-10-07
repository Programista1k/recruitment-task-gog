import {computed, inject, Injectable, PLATFORM_ID, signal, Signal, WritableSignal} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {Product} from '../../products/models/product.model';

@Injectable({providedIn: 'root'})
export class CartService {
  // We are working on small sets so array is alright there, if
  public readonly cartItems: Signal<Map<string, Product>> = computed(() => this._cartItems());
  private _cartItems: WritableSignal<Map<string, Product>> = signal(new Map<string, Product>());


  // We could use effect() to track changes to cartItems and sync localStorage, but effect should not be used to manage state.
  private readonly platformId = inject(PLATFORM_ID);
  private readonly LS_CART_KEY: string = 'gog_cart_items';

  public retrieveCart(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const cartProducts: Product[] = JSON.parse(localStorage.getItem(this.LS_CART_KEY) ?? '[]');

    const cartItemsMap: Map<string, Product> = this.cartItems();
    cartProducts.forEach((p) => cartItemsMap.set(p.id, p));

    this._cartItems.set(cartItemsMap);
  }

  public addToCart(product: Product): void {
    // fallback if somehow someone would break app and try to add same item;
    if (this.cartItems().has(product.id)) return;

    this._cartItems.update((cart) => {
      const cartItems = new Map(cart);
      cartItems.set(product.id, product);
      return cartItems;
    });
    this.saveCart();
  }

  public removeFromCart(product: Product): void {
    if (!this.cartItems().has(product.id)) return;

    this._cartItems.update((cart) => {
      const cartItems = new Map(cart);
      cartItems.delete(product.id);
      return cartItems;
    });
    this.saveCart();
  }

  private saveCart(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem(this.LS_CART_KEY, JSON.stringify(Array.from(this.cartItems().values())));
  }
}
