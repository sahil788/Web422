import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Position } from "./position";
@Injectable()
export class PositionService {

  
  
  constructor(private http : HttpClient) { }

  getPositions() : Observable<Position[]>{
    return this.http.get<Position[]>("https://teams-api-sahil.herokuapp.com/positions")
  }
}
