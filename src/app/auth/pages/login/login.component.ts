import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoad = false;

  constructor(private formBuilder: FormBuilder,
    public auth: AuthService) { }

  form: FormGroup = new FormGroup({})

  ngOnInit(): void {
    this.form = this.formBuilder.group({
     email: [this.auth.user?.email, [Validators.required, Validators.email]],
     password: ['', Validators.required],
     remember: ['']
   });
  }

  onSubmit(){
    this.auth.login(this.form.value, this);
  }
}
