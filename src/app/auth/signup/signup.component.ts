import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authService:AuthService) { }

  ngOnInit() {
  }

  onSignup(form:NgForm)
  {// console.log(form.value);
    if(form.invalid)
    {
      return;
    }
   // console.log(form.value.name);
     this.authService.createUser(form.value.name,form.value.email,form.value.password);
  }

}
