import { Component, OnInit } from '@angular/core';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { UserdataService } from '../services/userdata.service';
import { Register } from './register.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  register = new Register();
  target:any='';

  constructor(
    private spinner : NgxSpinnerService,
    private userdata : UserdataService
  ) { }

  ngOnInit(): void {
  }

  // registerUser()
  // {
  //     console.log(this.register);
  // }

  registerUser()
  {
    this.spinner.show();

    if(this.register.name == undefined || this.register.email == undefined || this.register.password == undefined)
    {
      this.target = '<div class="alert alert-danger" > Error! Please enter the details</div>';
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      return;
    }

    // console.log("inserted data: ",this.userobj.name);
    this.userdata.registerUser(this.register).subscribe( (response: any) =>{
      // this.spinner.hide();
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
     
      this.register.name='';
      this.register.email='';
      this.register.password='';
     
      console.log(response);

      if(response.code ==1)
      {
        this.target = '<div class="alert alert-success" > Success! '+response.message+'</div>';
      }
      else if(response.code ==2)
      {
        this.target = '<div class="alert alert-danger" > Error! '+response.message+'</div>';
      }
    });
  }

}
