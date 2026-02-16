import { Component, signal } from '@angular/core';
import { PurchaseInvoice } from "./features/purchase-invoice/purchase-invoice/purchase-invoice";

@Component({
  selector: 'app-root',
  imports: [PurchaseInvoice],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('PurchaseInvoice-app');
}
