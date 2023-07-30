import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  private API_URL = environment.API_URL;
  userdata: any;

  tokenVal = localStorage.getItem('token');
  header = new HttpHeaders({
    'Authorization': `Bearer ${this.tokenVal}`,
  });

  constructor(private httpRequest: HttpClient,
  ) {

  }

  loginUser(data: any) {
    return this.httpRequest.post(this.API_URL + 'login', data);
  }


  getDataFormApi(data:any) {
    this.tokenVal = localStorage.getItem('token');
    this.header = new HttpHeaders({
      'Authorization': `Bearer ${this.tokenVal}`,
    });
    
    return this.httpRequest.post(this.API_URL + 'student', data, {
      headers: this.header
    });
  }


  addStudent(data: any) {
    return this.httpRequest.post(this.API_URL + 'addstudent', data);

  }

  deleteData(id: number) {
    console.log("value of Id: ", id);
    return this.httpRequest.delete(this.API_URL + 'deleteStudent/' + id, {
      headers: this.header
    });
  }

  getOneStudent(id: any) {
    return this.httpRequest.get(this.API_URL + 'getOneStudent/' + id, {
      headers: this.header
    });
  }

  updateStudent(id: any, data: any) {
    return this.httpRequest.patch(this.API_URL + 'updateStudent/' + id, data, {
      headers: this.header
    });
  }

  // , { responseType: 'text' }
  registerUser(data: any) { 
    return this.httpRequest.post(this.API_URL + 'register', data);
  }


  logoutUser(token:any) {
    return this.httpRequest.get(this.API_URL + 'logout/' + token, {
      headers: this.header
    });
  }
  

}
