import { Component, inject, OnInit, output } from '@angular/core';
import { CheckoutService } from '../../../core/services/checkout.service';
import { MatRadioModule } from '@angular/material/radio';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../../core/services/cart.service';
import { DeliveryMethod } from '../../../shared/models/deliveryMethod';

@Component({
  selector: 'app-checkout-delivery',
  imports: [
    MatRadioModule,
    CurrencyPipe
  ],
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.scss',
})
export class CheckoutDeliveryComponent implements OnInit {
  checkoutService = inject(CheckoutService);
  cartServise = inject(CartService);
  deliveryComplete = output<boolean>();

  ngOnInit(): void {
    this.checkoutService.getDeliveryMethods().subscribe({
      next: methods => {
        if (this.cartServise.cart()?.deliveryMethodId) {
          const method = methods.find(x => x.id === this.cartServise.cart()?.deliveryMethodId);
          if (method) {
            this.cartServise.selectedDelivery.set(method);
            this.deliveryComplete.emit(true);
          }
        }
      }
    });
  }
  
  updateDeliveryMethod(method: DeliveryMethod) {
    this.cartServise.selectedDelivery.set(method);
    const cart = this.cartServise.cart();
    if (cart) {
      cart.deliveryMethodId = method.id;
      this.cartServise.setCart(cart);
      this.deliveryComplete.emit(true);
    }
  }
}
