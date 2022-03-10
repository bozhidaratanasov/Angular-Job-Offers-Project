import  Swal  from 'sweetalert2';
import { User } from './../models/user.model';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      checkbox: ['']
    })
    console.log(this.formGroup);
  }

  onSubmit(): void {
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