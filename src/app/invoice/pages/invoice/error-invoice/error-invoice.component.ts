import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-invoice',
  standalone: false,
  templateUrl: './error-invoice.component.html',
  styleUrls: ['./error-invoice.component.scss']
})
export class ErrorInvoiceComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
