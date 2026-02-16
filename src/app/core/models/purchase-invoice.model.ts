export interface PurchaseInvoiceItem {
  itemId: number;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface PurchaseInvoice {
  invoiceDate: Date;
  supplierId: number;
  notes: string;
  items: PurchaseInvoiceItem[];
  grandTotal: number;
}
