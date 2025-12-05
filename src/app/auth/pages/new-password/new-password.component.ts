import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-password',
  standalone: false,
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.scss']
})
export class NewPasswordComponent {
  constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute) { }

  form: FormGroup = new FormGroup({})
  email: string;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      token: ['', Validators.required],
    });

    this.route.queryParams.subscribe((params: any) => {
      this.form.get('email')?.setValue(params.email || '');
      this.form.get('token')?.setValue(params.token || '');
      this.email = params.email || '';
    });
  }

  onSubmit(){
    this.auth.passwordUpdate(this.form.value);
  }
}
