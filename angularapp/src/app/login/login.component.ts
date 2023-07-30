import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserdataService } from '../services/userdata.service';
import { Login } from './login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login = new Login
  target: any = ''
  token: any;
  tokenval:any = '';

  constructor(
    private spinner: NgxSpinnerService,
    private userdata: UserdataService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

 
  loginUser() {
    this.spinner.show();

    if (this.login.email == undefined || this.login.password == undefined) {
      this.target = '<div class="alert alert-danger" > Error! Please enter the details</div>';
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      return;
    }

    // console.log("inserted data: ",this.userobj.name);
    this.userdata.loginUser(this.login).subscribe((response: any) => {
      // this.spinner.hide();
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);

      this.login.email = '';
      this.login.password = '';

      console.log(response);

      if (response.code == 1) {
        this.token = localStorage.setItem('token', response.token);

        console.log("set token to storage", localStorage.getItem('token'));

        this.target = '<div class="alert alert-success" > Success! ' + response.message + '</div>';

        this.route.navigate(['dashboard']);

      }
      else if (response.code == 2) {
        this.target = '<div class="alert alert-danger" > Error! ' + response.message + '</div>';
      }
    });
  }

  show_password = false;
  showpasswordchars(){
    if(this.show_password == false)
    {
      this.show_password = true;
    }
    else{
      this.show_password = false;

    }
  }

}
