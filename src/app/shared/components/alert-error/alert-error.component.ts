import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-alert-error',
  standalone: false,
  templateUrl: './alert-error.component.html',
  styleUrls: ['./alert-error.component.scss']
})
export class AlertErrorComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
}
