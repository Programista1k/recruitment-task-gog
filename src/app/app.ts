import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Header} from './core/components/header/header';
import {CartService} from './features/cart/services/cart.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private readonly cartService: CartService = inject(CartService);

  public ngOnInit(): void {
    this.cartService.retrieveCart();
  }
}
