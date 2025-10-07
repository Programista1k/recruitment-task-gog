export interface ProductDto {
  id: string;
  thumbnailSrc: string;
  title: string;
  price: number;
  sale_price: number | null;
  currency_code: string;
  digits_info: string;
  is_owned: boolean;
}

// Im going for class here, because i dont know the backend contract, so i dont know if we should
// create appropriate factory or not.
export class Product {
  public id: string;
  public thumbnailSrc: string;
  public title: string;
  public price: number;
  public sale_price: number | null;
  public currency_code: string;
  public digits_info: string;

  // We assume that we would retrieve it based on some user profile/user account, and see if he has it
  // value is implemented right here without making additional "user-library" models, etc. because i dont know how backend is prepared, i can only assume.
  public is_owned: boolean;

  // I intentionally avoid Object.assign() here, because we want strong typing and to be explicit
  // about values from DTO objects (in case they change for example).
  constructor(productDto: ProductDto) {
    this.id = productDto.id;
    this.thumbnailSrc = productDto.thumbnailSrc;
    this.title = productDto.title;
    this.price = productDto.price;
    this.sale_price = productDto.sale_price ?? null;
    this.currency_code = productDto.currency_code;
    this.digits_info = productDto.digits_info;
    this.is_owned = productDto.is_owned;
  }

  public calculateDiscountPercentage(): number | undefined {
    if (!this.sale_price || this.sale_price >= this.price) return;
    const discount = ((this.price - this.sale_price) / this.price) * 100;
    return Math.round(discount);
  }

}
