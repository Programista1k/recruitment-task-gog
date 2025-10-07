import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID, provideZonelessChangeDetection } from '@angular/core';
import { CartService } from './cart.service';
import { Product } from '../../products/models/product.model';

describe(CartService.name, () => {
  let service: CartService;
  let store: Record<string, string>; // mock localStorage

  const makeProduct = (overrides?: Partial<Product>) =>
    new Product({
      id: 'test',
      title: 'Test',
      thumbnailSrc: 'thumb.webp',
      price: 50,
      sale_price: 25,
      is_owned: false,
      digits_info: '1.2-2',
      currency_code: 'USD',
      ...overrides,
    } as any);

  beforeEach(() => {
    store = {};
    spyOn(window.localStorage, 'getItem').and.callFake((k: string) => store[k] ?? null);
    spyOn(window.localStorage, 'setItem').and.callFake((k: string, v: string) => (store[k] = v));
    spyOn(window.localStorage, 'removeItem').and.callFake((k: string) => delete store[k]);

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        { provide: PLATFORM_ID, useValue: 'browser' },
        CartService,
      ],
    });

    service = TestBed.inject(CartService);
    service.clearCart();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('calculates discount on Product correctly', () => {
    const p = makeProduct({ price: 50, sale_price: 25 });
    expect(p.calculateDiscountPercentage()).toBe(50);
  });

  it('adds an item only once (no duplicates by id)', () => {
    const p = makeProduct({ id: 'A' });
    service.addToCart(p);
    service.addToCart(p);
    expect(service.cartItems().size).toBe(1);
    expect(Array.from(service.cartItems().keys())).toEqual(['A']);
  });

  it('removes item by id (no-op if missing)', () => {
    const p = makeProduct({ id: 'B' });
    service.addToCart(p);
    service.removeFromCart('B');
    service.removeFromCart('missing'); // no-op
    expect(service.cartItems().size).toBe(0);
  });

  it('clears all items', () => {
    service.addToCart(makeProduct({ id: 'C' }));
    service.addToCart(makeProduct({ id: 'D' }));
    service.clearCart();
    expect(service.cartItems().size).toBe(0);
  });

  it('persists to localStorage on add/clear', () => {
    service.addToCart(makeProduct({ id: 'P' }));
    expect(store['gog_cart_items']).toBeTruthy();
    service.clearCart();
    expect(JSON.parse(store['gog_cart_items'] ?? '[]')).toEqual([]);
  });

  it('retrieves cart from localStorage (hydration)', () => {
    const snapshot = JSON.stringify([makeProduct({ id: 'X' })]);
    store['gog_cart_items'] = snapshot;

    const fresh = TestBed.inject(CartService);
    fresh.retrieveCart();

    expect(fresh.cartItems().size).toBe(1);
    expect(fresh.cartItems().get('X')?.id).toBe('X');
  });

  it('does not add owned product (if enforced)', () => {
    const owned = makeProduct({ id: 'OWN', is_owned: true });
    service.addToCart(owned);
    expect(service.cartItems().size).toBe(0);
  });
});
