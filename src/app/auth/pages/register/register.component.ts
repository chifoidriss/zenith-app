import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
// import { AppValidators } from '../../shared/validators/exists.validator';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isLoad = false;

  constructor(private formBuilder: FormBuilder,
    private auth: AuthService) { }

  form: FormGroup = new FormGroup({})

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.min(3)]],
      last_name: ['', [Validators.required, Validators.min(3)]],
      // email: ['', [Validators.required, Validators.email, AppValidators.exists('users', 'email')]],
      // phone: ['', Validators.required, AppValidators.exists('users', 'phone')],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      accept: ['']
    });
  }

  onSubmit(){
    this.auth.register(this.form.value, this);
  }
}
