import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  OnInit,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ProductSingleListing } from '../products/components/product-single-listing/product-single-listing';
import { ProductService } from '../products/services/product.service';
import { Product } from '../products/models/product.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CartService } from '../cart/services/cart.service';

@Component({
  selector: 'app-landing-page',
  imports: [NgOptimizedImage, ProductSingleListing],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPage implements OnInit {
  protected products: Signal<Product[]> = computed(() => this._products());
  protected cartItemsIds: Signal<string[]> = computed(() =>
    Array.from(this.cartService.cartItems().keys()),
  );

  private _products: WritableSignal<Product[]> = signal([]);

  private readonly productService: ProductService = inject(ProductService);
  private readonly cartService: CartService = inject(CartService);
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  public ngOnInit(): void {
    this.productService
      .fetchAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (products: Product[]) => this._products.set(products),
        error: () =>
          console.log(
            'Here add error toastr/etc/handling - or we can do this in service/interceptor also',
          ),
        complete: () =>
          console.log(
            'Here it completes, LOADER SHOULD NOT BE STOPPED HERE! but inside finalize() pipe!',
          ),
      });
  }

  protected addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
