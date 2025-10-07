import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingleListing } from './product-single-listing';

describe('ProductSingleListing', () => {
  let component: ProductSingleListing;
  let fixture: ComponentFixture<ProductSingleListing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductSingleListing]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductSingleListing);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
