import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReasonLeavingService } from '../../../../pay/services/reason-leaving.service';

@Component({
  selector: 'app-new-reason-leaving',
  standalone: false,
  templateUrl: './new-reason-leaving.component.html',
  styleUrls: ['./new-reason-leaving.component.scss']
})
export class NewReasonLeavingComponent {
  // accounts: any[] = [];
  form: FormGroup = new FormGroup({})

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewReasonLeavingComponent>,
    private reasonLeavingService: ReasonLeavingService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.data?.id],
      name: [this.data?.name || '', [Validators.required]],
      description: [this.data?.description || ''],
    });
  }

  save() {
    this.reasonLeavingService.store(this.form.value, (data) => {
      this.dialogRef.close(data);
    });
  }
}
