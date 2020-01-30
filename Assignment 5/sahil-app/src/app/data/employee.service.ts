import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Employee } from "./employee";

@Injectable()
export class EmployeeService {

  constructor(private http : HttpClient) {}
  
    getEmployees() : Observable<Employee[]>{
      return this.http.get<Employee[]>("https://teams-api-sahil.herokuapp.com/employees")
    }
}
