// src/app/person/person.component.ts

import { Component, OnInit } from '@angular/core';
import { Person } from '../person.model';
import { PersonService } from '../person.service';
import { AbstractControl, FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';

import { provinces } from './province';
@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  personForm: FormGroup = new FormGroup({});
  persons: Person[] = [];
  submittedPerson: any = null;
  provincesList = provinces; 
  id: number = 0;
  constructor(private personService: PersonService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.personForm.get('lastUpdated')?.setValue(new Date());
    this.personService.getPersonList().subscribe(
      (data: Person[]) => {
        this.persons = data;
      },
      (error) => {
        console.error('Error fetching person data: ', error);
      }
    );

  
  

    this.personForm = this.fb.group({
      id: [this.setId(), [Validators.required, Validators.min(1), Validators.max(100)]],
      firstName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      lastName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      province: ['', [Validators.required, this.provinceValidator.bind(this)]],
      lastUpdated: [new Date('February 4, 2016 10:13:00'), Validators.required],
      phone: ['',[Validators.required]],
      address: ['', Validators.required],
    });
    
    
    

  }

  setId(): number {
    this.id = this.id + 1;
    return this.id;
  }

 

  get formattedPhonenumber(): string {
    const phone = this.personForm.get('phone')?.value;
    if (!phone) return '';
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  provinceValidator(control: AbstractControl): ValidationErrors | null {
    return this.provincesList.includes(control.value) ? null : { invalidProvince: true };
  }
  

  submitForm() {
    console.log(this.personForm.value,'-------------')
    if (this.personForm.valid) {
      console.log('Form submitted successfully!');
      this.personForm.reset();
     
    } else {
      console.log('Form invalid. Please check your inputs.');
    }
  }
}
