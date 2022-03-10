import  Swal  from 'sweetalert2';
import { User } from './../models/user.model';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formGroup!: FormGroup;
  checkboxChecked!: boolean;


  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  get nameFormControl(): FormControl {
    return this.formGroup.get('name') as FormControl;
  }

  get emailFormControl(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  get passwordFormControl(): FormControl {
    return this.formGroup.get('password') as FormControl;
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      checkbox: ['']
    })
    console.log(this.formGroup);
  }

  onSubmit(): void {

    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();

      return;
    }

    const user: User = {
      name: this.formGroup.value.name,
      email: this.formGroup.value.email,
      password: this.formGroup.value.password,
      role: this.checkboxChecked ? 'organization' : 'user',

    }

    if (!this.checkboxChecked)
      user.offerStatus = {};

    this.userService.createUser$(user).subscribe();
    Swal.fire({
      title: 'Congratulations!',
      text: 'You have successfully registered!',
      icon: 'success',
      confirmButtonText: 'Nice!'
    }).then(({isConfirmed}) => {
      this.router.navigate(['login']);
    });
  }

}