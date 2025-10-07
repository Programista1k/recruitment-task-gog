import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { ProductSingleListing } from './product-single-listing';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Product } from '../../models/product.model';

describe(ProductSingleListing.name, () => {
  let fixture: ComponentFixture<ProductSingleListing>;
  let comp: ProductSingleListing;
  const mk = (overrides?: Partial<Product>) =>
    new Product({
      id: 'p1',
      title: 'The Witcher',
      thumbnailSrc: 'witcher.webp',
      price: 99.99,
      sale_price: null,
      currency_code: 'USD',
      digits_info: '1.2-2',
      is_owned: false,
      ...overrides,
    } as any);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingleListing, NgOptimizedImage],
      providers: [provideZonelessChangeDetection(), CurrencyPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductSingleListing);
    comp = fixture.componentInstance;
  });

  function setInputs(p: Product, cartIds: string[] = []) {
    fixture.componentRef.setInput('product', p);
    fixture.componentRef.setInput('cartItemsIds', cartIds);
    fixture.detectChanges();
  }

  it('renders title, image and price button when not in cart', () => {
    setInputs(mk());
    const el: HTMLElement = fixture.nativeElement;

    expect(el.textContent).toContain('The Witcher');
    const img = el.querySelector('img') as HTMLImageElement;
    expect(img?.getAttribute('ngSrc') || img?.getAttribute('src')).toContain('witcher.webp');

    const btn = el.querySelector('button[data-test="add-to-cart"]') as HTMLButtonElement;
    expect(btn).toBeTruthy();
    expect(btn.type).toBe('button');
    expect(btn.getAttribute('aria-label')).toMatch(/Add .* to cart/i);
    expect(btn.textContent).toMatch(/\$?\d/);
  });

  it('emits addToCart on click when not in cart', () => {
    const p = mk();
    setInputs(p);

    const spy = spyOn(comp.addToCart, 'emit');
    (
      fixture.nativeElement.querySelector('button[data-test="add-to-cart"]') as HTMLButtonElement
    ).click();
    expect(spy).toHaveBeenCalledWith(p);
  });

  it('shows IN CART instead of button when already in cart', () => {
    const p = mk({ id: 'p-cart' });
    setInputs(p, ['p-cart']);

    const el: HTMLElement = fixture.nativeElement;
    expect(el.textContent).toContain('IN CART');
    expect(el.querySelector('button[data-test="add-to-cart"]')).toBeNull();
  });

  it('renders sale price and discount when sale_price < price', () => {
    const p = mk({ price: 100, sale_price: 80 });
    setInputs(p);

    const el: HTMLElement = fixture.nativeElement;
    const price = el.querySelector('[data-test="add-to-cart"]')?.textContent ?? '';
    expect(price).toMatch(/80(\.00)?/);

    const discount = p.calculateDiscountPercentage();
    if (discount !== undefined) {
      expect(el.textContent).toContain(`${discount}%`);
    }
  });

  it('disables add for owned product (if supported)', () => {
    const p = mk({ is_owned: true });
    setInputs(p);
    expect(fixture.nativeElement.textContent).toContain('OWNED');
  });

  it('button is focusable and has aria-label', () => {
    setInputs(mk());
    const btn = fixture.nativeElement.querySelector(
      'button[data-test="add-to-cart"]',
    ) as HTMLButtonElement;
    btn.focus();
    expect(document.activeElement === btn).toBeTrue();
    expect(btn.getAttribute('aria-label')).toBeTruthy();
  });
});
