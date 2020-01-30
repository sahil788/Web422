import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import { Employee, Position } from "./vm-typicode";
import { EmployeeRaw } from "./employeeRaw";

@Injectable()
export class EmployeeService {
  private url = "https://teams-api-sahil.herokuapp.com";

  private employees: string[] = [];

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.url}/employees`);
  }

  saveEmployee(employee:EmployeeRaw): Observable<any> {
    return this.http.put<any>("https://teams-api-sahil.herokuapp.com/employee/" + employee._id, employee);
  }

  getEmployee(id): Observable<EmployeeRaw[]> {
    return this.http.get<EmployeeRaw[]>("https://teams-api-sahil.herokuapp.com/employee-raw/" + id);
  }

}
