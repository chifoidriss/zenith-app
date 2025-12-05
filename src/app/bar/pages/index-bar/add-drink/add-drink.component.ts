import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-drink',
  standalone: false,
  templateUrl: './add-drink.component.html',
  styleUrls: ['./add-drink.component.scss']
})
export class AddDrinkComponent {
  data: any = {
    name: '',
    category_id: '',
    price: ''
  }

  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      category_id: ['', [Validators.required]],
      price: ['', [Validators.required]],
    })
  }
}
