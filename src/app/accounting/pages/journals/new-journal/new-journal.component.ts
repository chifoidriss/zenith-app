import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { JournalService } from '../../../../accounting/services/journal.service';

@Component({
  selector: 'app-new-journal',
  standalone: false,
  templateUrl: './new-journal.component.html',
  styleUrls: ['./new-journal.component.scss']
})
export class NewJournalComponent {
  form: FormGroup = new FormGroup({})
  unitGroups: any [] = [];

  constructor( private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NewJournalComponent>,
    private journalService: JournalService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngAfterViewInit() {
    $('.form-group .form-control').on('focus blur change', function (e) {
      const val: any = $(this).val() || [];
      $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || val.length > 0));
    }).trigger('blur');
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.data?.id],
      name: [this.data?.name, [Validators.required]],
      parent_id: [this.data?.parent_id],
      role: [this.data?.role || 'MAIN'],
      unity: [this.data?.unity || '1'],
      code: [this.data?.code || ''],
      status: [this.data?.status || 0],
    });

    this.journalService.index((data) => {
      this.unitGroups = data.data;
    });
  }

  save() {
    this.journalService.store(this.form.value, (data) => {
      this.dialogRef.close(data);
    });
  }
}
