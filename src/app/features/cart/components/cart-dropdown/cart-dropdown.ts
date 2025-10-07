import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Product } from '../../../products/models/product.model';
import { CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-cart-dropdown',
  imports: [NgOptimizedImage, CdkConnectedOverlay, CurrencyPipe],
  providers: [CurrencyPipe],
  templateUrl: './cart-dropdown.html',
  styleUrl: './cart-dropdown.css',
})
export class CartDropdown {
  public cartItems: InputSignal<Map<string, Product>> = input.required();

  public removeFromCart: OutputEmitterRef<string> = output();
  public clearCart: OutputEmitterRef<void> = output();

  protected cartItemsCount: Signal<number> = computed(() => this.cartItems().size);
  protected open: WritableSignal<boolean> = signal(false);

  protected positions: ConnectedPosition[] = [
    { originX: 'end', originY: 'bottom', overlayX: 'end', overlayY: 'top', offsetY: 0 },
    { originX: 'end', originY: 'top', overlayX: 'end', overlayY: 'bottom', offsetY: -7 },
  ];

  private readonly currencyPipe: CurrencyPipe = inject(CurrencyPipe);

  protected getProductPrice(product: Product): number {
    if (product.sale_price) return product.sale_price;
    return product.price;
  }

  protected sumCartItemsPrice(): string | null {
    const cartItems: Product[] = Array.from(this.cartItems().values());

    if (cartItems.length <= 0) return null;

    const currencyCode = cartItems[0].currency_code;
    const digitsInfo = cartItems[0].digits_info;

    let summedPrice: number = 0;

    cartItems.forEach((item) => {
      if (item.sale_price) {
        summedPrice += item.sale_price;
      } else {
        summedPrice += item.price;
      }
    });

    return this.currencyPipe.transform(summedPrice, currencyCode, 'symbol', digitsInfo);
  }
}
