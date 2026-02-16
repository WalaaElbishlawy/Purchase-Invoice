// This allows the class to be injected as a service in other components
import { Injectable } from '@angular/core';
import { Supplier } from '../models/supplier.model';

@Injectable({ providedIn: 'root' })
export class SupplierService {

  private suppliers: Supplier[] = [
    { id: 1, name: 'Walaa Hassan' }, 
    { id: 2, name: 'Global Trade' } ,
    { id: 3, name: 'Tech Supplies' }, 
  ];

   getSuppliers(): Supplier[] {
    return this.suppliers;
  }
}