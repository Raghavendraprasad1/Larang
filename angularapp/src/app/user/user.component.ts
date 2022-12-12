import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../services/userdata.service';
import { User } from './user.model';
import { NgxSpinnerService, Spinner } from "ngx-spinner";
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  page:number = 1;
  userdata1: any;
  studentData: any;
  userobj = new User();
  target: string = '';
  token = '';
  limit:number= 5;   // to show total number of value by default
  skip:number=0;
  studentResult:any;
  collectionSize:number=0;

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
    private route: Router
  ) {
  }



  ngOnInit(): void {
    this.showApiData();
  }

  showApiData() {

      if(this.page == 1)
      {
        this.skip = 0;
      }
      else{
        this.skip= (this.page-1) * this.limit;
      }

    var reqObject = {
      'limit' : this.limit,
      'skip' : this.skip,
      'search': this.userobj.search
    }

    this.userdata.getDataFormApi(reqObject).subscribe(res => {
  
      this.studentResult = res;
      this.studentData = this.studentResult.data;
      this.collectionSize = this.studentResult.count;
    });
  }

  searchUser()
  {
    this.showApiData();
  }

  setPageLength()
  {
    this.limit=this.userobj.pageLength;
    this.showApiData();
    
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

  logoutUser() {
    var c = confirm("Are you sure you want to logout?");
    if (c) {
      this.spinner.show();
      this.userdata.logoutUser(localStorage.getItem('token')).subscribe((response: any) => {

        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);

        if (response.code == 1) {
          localStorage.removeItem('token');
          this.route.navigate(['/']);
        }
        else if (response.code == 2) {
          this.target = '<div class="alert alert-danger" > Error! ' + response.message + '</div>';
        }

      });
    }

  }


}
