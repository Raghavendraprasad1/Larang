import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  file:any;
  imagePreview:any;

  constructor(
    private spinner : NgxSpinnerService,
    private userdata : UserdataService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  imageUpload(event:any)
  {
    // console.log(event);
    this.file = event.target.files[0];
    // console.log(this.file);

    if(this.file)
    {
      const reader = new FileReader;

      reader.onload = (e:any) => {
        this.imagePreview = e.target.result;
      }

      reader.readAsDataURL(this.file);
    }

  }

  

  registerUser()
  {
    this.spinner.show();

    if(this.register.name == undefined || this.register.email == undefined || this.register.password == undefined || this.register.contact == undefined)
    {
      this.target = '<div class="alert alert-danger" > Error! Please enter valid details</div>';
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      return;
    }

    var formdata = new FormData();

    formdata.append("file", this.file, this.file.name);
    formdata.append("email", this.register.email);
    formdata.append("name", this.register.name);
    formdata.append("password", this.register.password);
    formdata.append("contact", this.register.contact);



    this.userdata.registerUser(formdata).subscribe( (response: any) =>{
      // this.spinner.hide();
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
     
      this.register.name='';
      this.register.email='';
      this.register.password='';
      this.register.contact='';
     
      console.log(response);

      if(response.code ==1)
      {
        this.target = '<div class="alert alert-success" > Success! '+response.message+'</div>';

        this.route.navigate(['/']);

      }
      else if(response.code ==2)
      {
        this.target = '<div class="alert alert-danger" > Error! '+response.message+'</div>';
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
