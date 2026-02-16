import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ItemService } from '../../../core/services/item.service';
import { SupplierService } from '../../../core/services/supplier.service';
import { Item } from '../../../core/models/item.model';
import { Supplier } from '../../../core/models/supplier.model';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-purchase-invoice',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './purchase-invoice.html',
  styleUrls: ['./purchase-invoice.css']
})
export class PurchaseInvoice implements OnInit {
  invoiceForm!: FormGroup;
  suppliers: Supplier[] = [];
  items: Item[] = [];
  showReceipt = false;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private supplierService: SupplierService
  ) {}

  ngOnInit(): void {
    this.suppliers = this.supplierService.getSuppliers();
    this.items = this.itemService.getItems();
    this.initializeForm();
  }

  private initializeForm(): void {
    this.invoiceForm = this.fb.group({
      invoiceDate: [new Date().toISOString().split('T')[0], Validators.required],
      supplierId: ['', Validators.required],
      notes: [''],
      items: this.fb.array([]),
      grandTotal: [{ value: 0, disabled: true }]
    });

    this.addItem(); // start with one empty row
  }

  get itemsFormArray(): FormArray {
    return this.invoiceForm.get('items') as FormArray;
  }

  private createItemFormGroup(): FormGroup {
    return this.fb.group({
      itemId: ['', Validators.required],
      itemName: [{ value: '', disabled: true }],
      quantity: [1, [Validators.required, Validators.min(1)]],
      unitPrice: [{ value: 0, disabled: true }],
      total: [{ value: 0, disabled: true }]
    });
  }

  addItem(): void {
    const fg = this.createItemFormGroup();

    // Listen for changes in item selection or quantity
    fg.valueChanges.subscribe(val => {
      const selectedItem = this.items.find(i => i.id === val.itemId);
      if (selectedItem) {
        // patchValue updates certain fields without triggering valueChanges again
        fg.patchValue({
          itemName: selectedItem.name,
          unitPrice: selectedItem.unitPrice,
          total: selectedItem.unitPrice * val.quantity
        }, { emitEvent: false });

        this.calculateGrandTotal();
      }
    });

    this.itemsFormArray.push(fg);
    this.calculateGrandTotal();
  }

  removeItem(index: number): void {
    if (this.itemsFormArray.length > 1) {
      this.itemsFormArray.removeAt(index);
      this.calculateGrandTotal();
    }
  }

  private calculateGrandTotal(): void {
    const total = this.itemsFormArray.controls.reduce(
      (sum, fg) => sum + (fg.get('total')?.value || 0),
      0
    );
    this.invoiceForm.get('grandTotal')?.setValue(total);
  }

  onSubmit(): void {
    if (this.invoiceForm.valid) {
      console.log(this.invoiceForm.getRawValue());
      this.showReceipt = true;
    } else {
      alert('Please fill all required fields.');
    }
  }

  resetForm(): void {
    this.invoiceForm.reset({
      invoiceDate: new Date().toISOString().split('T')[0],
      supplierId: '',
      notes: '',
      grandTotal: 0
    });
    this.itemsFormArray.clear();
    this.addItem();
    this.showReceipt = false;
  }

  getSupplierName(id: any): string {
    const supplier = this.suppliers.find(s => s.id === id);
    return supplier ? supplier.name : '';
  }
}
