import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      name: ['', Validators.required],
      age: [null, Validators.required],
      weight: [null, Validators.required],
      height: [null, Validators.required],
    });
  }

  onSubmit() {
    if (this.basicForm.valid) {
      const submittedVal = this.basicForm.value;
      console.log('submitted = ', submittedVal);
      this.toastr.success('Successfully submitted data', 'Success');

      this.basicForm.reset();
    } else {
      this.toastr.error('Please check again', 'Error');
    }
  }
}
