import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { User } from '../user/user.model';


@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  private API_URL = environment.API_URL;
  userdata: any;


  tokenVal: any = localStorage.getItem('token');

  constructor(private httpRequest: HttpClient,
  ) { }

  currentToken = this.tokenVal !== null ? this.tokenVal : new User();

  header = new HttpHeaders({
    'Authorization': "Bearer " + this.currentToken,
    'token': this.currentToken
  });


  getDataFormApi() {
    return this.httpRequest.get(this.API_URL + 'student', {
      headers: this.header
    });

  }

  testLaravelApi() {
    return this.httpRequest.get(this.API_URL + 'user', {
      headers: this.header
    });

  }

  addStudent(data: any) {
    return this.httpRequest.post(this.API_URL + 'addstudent', data);

  }

  deleteData(id: number) {
    console.log("value of Id: ", id);
    return this.httpRequest.delete(this.API_URL + 'deleteStudent/' + id);

  }

  getOneStudent(id: any) {
    return this.httpRequest.get(this.API_URL + 'getOneStudent/' + id);
  }

  updateStudent(id: any, data: any) {
    return this.httpRequest.patch(this.API_URL + 'updateStudent/' + id, data);
  }

  registerUser(data: any) {
    return this.httpRequest.post(this.API_URL + 'register', data);

  }

  loginUser(data: any) {
    return this.httpRequest.post(this.API_URL + 'login', data);
  }

}
