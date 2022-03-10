import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;
  invalidData!: boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserService) { }

  get emailFormControl(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit(): void {

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();

      return;
    }

    this.userService.login$(this.formGroup.value).subscribe(response => {

      if (response) {
        this.userService.storeUserData(response);
        this.router.navigate(['/']);
      }
      else
        this.invalidData = true;
      
    })
  }

}
