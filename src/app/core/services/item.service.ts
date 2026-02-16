import { Injectable } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({ providedIn: 'root' })
export class ItemService {

  private items: Item[] = [
    { id: 1, code: 'ITM-001', name: 'Laptop', unitPrice: 1000 },
    { id: 2, code: 'ITM-002', name: 'Mouse', unitPrice: 50 },
    { id: 3, code: 'ITM-003', name: 'Keyboard', unitPrice: 80 },
    { id: 4, code: 'ITM-004', name: 'Monitor', unitPrice: 300 },
    { id: 5, code: 'ITM-005', name: 'Printer', unitPrice: 150 },
  ];

  getItems(): Item[] {
    return this.items;
  }
}
