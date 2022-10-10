import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../services/userdata.service';
import { User } from './user.model';
import { NgxSpinnerService, Spinner } from "ngx-spinner";
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userdata1: any;
  studentData: any;
  userobj = new User();
  target: string = '';
  token = '';

  subjects = [
    {
      key: 'Hindi',
      value: 'hindi'
    },
    {
      key: 'English',
      value: 'english'
    }, {
      key: 'Science',
      value: 'science'
    }, {
      key: 'Math',
      value: 'math'
    },

  ]

  constructor(
    private userdata: UserdataService,
    private spinner: NgxSpinnerService,

  ) {
  }



  ngOnInit(): void {
    // console.log(this.userdata1);
    this.showApiData();
    this.testLaravelApi();
  }

  showApiData() {
    this.userdata.getDataFormApi().subscribe(res => {
      console.log(res)
      this.studentData = res;
    });
  }

  testLaravelApi() {
    this.userdata.testLaravelApi().subscribe(res => {
      console.log('laravel-api-test', res)
    });
  }

  addStudent() {
    this.spinner.show();

    if (this.userobj.name == undefined || this.userobj.email == undefined || this.userobj.contact == undefined) {
      this.target = '<div class="alert alert-danger" > Error! Please enter the details</div>';
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      return;
    }

    // console.log("inserted data: ",this.userobj.name);
    this.userdata.addStudent(this.userobj).subscribe((response: any) => {
      // this.spinner.hide();
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      this.showApiData();  // refresh the table data
      this.userobj.name = '';
      this.userobj.email = '';
      this.userobj.contact = '';

      console.log(response);

      if (response.code == 1) {
        this.target = '<div class="alert alert-success" > Success! ' + response.message + '</div>';
      }
      else if (response.code == 2) {
        this.target = '<div class="alert alert-danger" > Error! ' + response.message + '</div>';
      }
    });
  }

  deleteData(id: number) {
    var c = confirm("Are you sure you want to delete this record?");
    if (c) {
      this.spinner.show();
      this.userdata.deleteData(id).subscribe((response: any) => {


        this.showApiData();  // refresh the table data
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);

        if (response.code == 1) {
          this.target = '<div class="alert alert-success" > Success! ' + response.message + '</div>';
        }
        else if (response.code == 2) {
          this.target = '<div class="alert alert-danger" > Error! ' + response.message + '</div>';
        }

      });
    }

  }

  subjectChange(event: any) {
    console.log(event.target.value);
  }


}
