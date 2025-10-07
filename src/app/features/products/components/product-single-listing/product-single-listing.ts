import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  InputSignal,
  output,
  OutputEmitterRef,
  Signal,
} from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-single-listing',
  imports: [NgOptimizedImage, CurrencyPipe],
  templateUrl: './product-single-listing.html',
  styleUrl: './product-single-listing.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSingleListing {
  public product: InputSignal<Product> = input.required();
  public cartItemsIds: InputSignal<string[]> = input<string[]>([]);
  public addToCart: OutputEmitterRef<Product> = output();

  public productPrice: Signal<number> = computed(() => {
    const product = this.product();
    if (product.sale_price) return product.sale_price;
    return product.price;
  });

  protected isInCart: Signal<boolean> = computed(() =>
    this.cartItemsIds().includes(this.product().id),
  );
}
