import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css'],
})
export class BasicFormComponent {
  title = 'Basic Form';
  basicForm: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {
    // create and init the form
    this.initForm();
  }

  initForm() {
    this.basicForm = this.fb.group({
      name: [''],
      age: [],
      weight: [],
      height: [],
    });
  }

  onSubmit() {
    //console.log('Console: submitted with value: ', this.basicForm.value);
    const submittedVal = this.basicForm.value;
    console.log('submitted = ', submittedVal);
    this.toastr.success('Successfully submitted data', 'Success');
  }
}
