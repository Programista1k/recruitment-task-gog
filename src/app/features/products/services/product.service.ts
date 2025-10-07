import {Injectable} from '@angular/core';
import {map, Observable, of} from 'rxjs';
import {Product, ProductDto} from '../models/product.model';

@Injectable({providedIn: 'root'})
export class ProductService {

  // We generate UUID, we can also use plain ID, but idk. if u use MongoDB/Postgres/Mysql so i assume UUID
  // because its lot simpler to manage and avoid duplications on backend with UUID with a lot of microservices.
  private readonly mockedProducts: ProductDto[] = [
    {
      id: 'd90db6a6-637c-4ff0-bf44-d8558e24632e',
      thumbnailSrc: 'images/products/oddworld.webp',
      title: 'oddworld: stranger’s wrath',
      price: 19.98,
      sale_price: 9.99,
      currency_code: 'USD',
      digits_info: '1.2-2',
      is_owned: false
    },
    {
      id: 'ea87aa63-f66b-4692-9b9b-ce0e7710281c',
      thumbnailSrc: 'images/products/chaos.webp',
      title: 'chaos on deponia',
      price: 9.99,
      sale_price: null,
      currency_code: 'USD',
      digits_info: '1.2-2',
      is_owned: true
    },
    {
      id: 'c5a5fe5c-23f6-4c4a-a70e-28f107e48682',
      thumbnailSrc: 'images/products/settlers.webp',
      title: 'The settlers 2: gold edition',
      price: 5.99,
      sale_price: null,
      currency_code: 'USD',
      digits_info: '1.2-2',
      is_owned: false
    },
    {
      id: 'b85504ce-9621-4d78-8ef8-bc81333b130d',
      thumbnailSrc: 'images/products/neverwinter.webp',
      title: 'neverwinter nights',
      price: 19.98,
      sale_price: 9.99,
      currency_code: 'USD',
      digits_info: '1.2-2',
      is_owned: false
    },
    {
      id: 'c50fc76d-7943-46a0-a4b0-d3acbabb474f',
      thumbnailSrc: 'images/products/assasins.webp',
      title: 'assassin’s creed: director’s cut',
      price: 9.99,
      sale_price: null,
      currency_code: 'USD',
      digits_info: '1.2-2',
      is_owned: false
    }
  ]

  // Ofc. we would add parameters like limit, etc. so it will show only 4 on LP.
  public fetchAll(): Observable<Product[]> {
    return of(this.mockedProducts).pipe(map((productsDto: ProductDto[]) =>
      productsDto.map((productDto) => new Product(productDto))
    ))
  }
}
