import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserdataService } from '../services/userdata.service';
import { User } from '../user/user.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id:any;
  userobj = new User();
  data:any;
  target:string=''

  constructor(
    private route: ActivatedRoute,
    private userdata: UserdataService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.id= this.route.snapshot.params.id
    this.getOneStudent();
  }

  getOneStudent()
  {
    this.userdata.getOneStudent(this.id).subscribe(res =>{
      this.data = res;
      this.userobj = this.data;

    });
  }


  updateStudent()
  {
    this.spinner.show();

    if(this.userobj.name == undefined || this.userobj.email == undefined || this.userobj.contact == undefined)
    {
      this.target = '<div class="alert alert-danger" > Error! Please enter the details</div>';
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      return;
    }

    // console.log("inserted data: ",this.userobj.name);
    this.userdata.updateStudent(this.id,this.userobj).subscribe((response: any) =>{
      // this.spinner.hide();
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 1000);
      
      this.userobj.name='';
      this.userobj.email='';
      this.userobj.contact='';
     
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
