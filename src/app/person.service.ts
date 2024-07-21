import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from './person.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private personsUrl = 'assets/persons.json';  // URL to JSON file

 
  constructor(private http: HttpClient) { }

  


  getPersonList(): Observable<Person[]> {
    return this.http.get<Person[]>(this.personsUrl);
  }
}
