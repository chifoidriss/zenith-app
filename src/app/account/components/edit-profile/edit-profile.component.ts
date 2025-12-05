import { Component, Inject } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-edit-profile',
  standalone: false,
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent {
  form: FormGroup = new FormGroup({})

  countries: any[] = [];
  regions: any[] = [];

  constructor( private formBuilder: UntypedFormBuilder,
    public dialogRef: MatDialogRef<EditProfileComponent>,
    private accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      genre: [this.data?.genre, [Validators.required]],
      birthday: [this.data?.birthday, [Validators.required]],
      country_id: [this.data?.address?.country_id, [Validators.required]],
      region_id: [this.data?.address?.region_id, [Validators.required]],
      city: [this.data?.address?.city, [Validators.required]],
    });

    this.accountService.countries((response) => {
      this.countries = response;
      this.getRegionByCountry(this.data?.address?.country_id);
    });
  }

  getRegionByCountry(id) {
    this.regions = this.countries.find(elt => elt.id == id)?.regions || [];
  }

  save() {
    this.accountService.updateInformations(this.form.value, (data) => {
      this.dialogRef.close(data);
    });
  }
}
