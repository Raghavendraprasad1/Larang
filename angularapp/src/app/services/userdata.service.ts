import { Injectable } from '@angular/core';
import {HttpClient} from  '@angular/common/http'; 
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserdataService {
  userdata:any;
  private API_URL= environment.API_URL;
  constructor(private httpRequest:HttpClient) { }

  getUserData()
  {
    return this.userdata = [
      {
        'name': 'raghav',
        'email': 'raghav@gmail.com'
      },
      {
        'name': 'himanshu',
        'email': 'himanshu@gmail.com'
      }
    ];
  }

  getDataFormApi()
  {
    return this.httpRequest.get(this.API_URL+'student');
  }

  addStudent(data:any)
  {
    return this.httpRequest.post(this.API_URL+'addstudent', data);
  
  }

  deleteData(id:number)
  {
    console.log("value of Id: ",id);
    return this.httpRequest.delete(this.API_URL+'deleteStudent/'+id);

  }

  getOneStudent(id:any)
  {
    return this.httpRequest.get(this.API_URL+'getOneStudent/'+id);
  }

  updateStudent(id:any, data:any)
  {
    return this.httpRequest.patch(this.API_URL+'updateStudent/'+id, data);
  }
  
}
