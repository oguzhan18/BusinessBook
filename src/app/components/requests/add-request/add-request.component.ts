import { Component, OnInit, Output , EventEmitter} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Request} from '../../../interfaces/Request.interface';

@Component({
  selector: 'app-add-request',
  templateUrl: './add-request.component.html',
  styleUrls: ['./add-request.component.css']
})
export class AddRequestComponent implements OnInit {

  @Output() onAddRequest: EventEmitter<Request> = new EventEmitter();
  
  addRequestForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.initializeForm();
  }
  initializeForm(): void {
    this.addRequestForm = this.fb.group({
      client:['', [Validators.required, Validators.minLength(3)]],
      address:['', [Validators.required, Validators.minLength(3)]],
      date:['', [Validators.required, Validators.minLength(3)]],
      problem:['', [Validators.required, Validators.minLength(3)]],
    });
  }
  onSubmit(){
    const newRequest = {
      client: this.addRequestForm.value.client,
      address: this.addRequestForm.value.address,
      date: this.addRequestForm.value.date,
      problem: this.addRequestForm.value.problem,
    };
    this.onAddRequest.emit(newRequest); 
    this.addRequestForm.reset();
    for (let control in this.addRequestForm.controls) {
      this.addRequestForm.controls[control].setErrors(null); 
    }
  }
}
