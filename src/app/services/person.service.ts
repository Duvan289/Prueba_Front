import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { Person } from "../models/person";

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  API_URI = 'http://localhost:3000';
  constructor(private http:HttpClient) { }
  getPersons(){
    return this.http.get(`${this.API_URI}/persons`);
  }
  updatePerson(id: string|number,updatedProduct: Person): Observable<any>{
    return this.http.put(`${this.API_URI}/persons/${id}`,updatedProduct);
  }
  savePerson(product:Person){
    return this.http.post(`${this.API_URI}/persons`,product);
  }
  deletePerson(id: string|number){
    return this.http.delete(`${this.API_URI}/persons/${id}`)
  }
}
