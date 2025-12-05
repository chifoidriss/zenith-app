import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-transfer-modal',
  standalone: false,
  templateUrl: './error-transfer-modal.component.html',
  styleUrls: ['./error-transfer-modal.component.scss']
})
export class ErrorTransferModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
