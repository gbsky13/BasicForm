import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css'],
})
export class BasicFormComponent implements OnInit {
  title = 'XXX Class Registration Form';
  basicForm: FormGroup;
  validSubmit: Boolean;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.basicForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      birthday: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      weight: ['', Validators.required],
      height: ['', Validators.required],
      cvaccine: ['', Validators.required],
      // classLevel: ['', Validators.required],
      // session: ['', Validators.required],
    });
  }

  onChangeSession(value: string) {
    console.log(value);
  }

  onSubmit() {
    if (this.basicForm.valid) {
      console.log('success submit: ', this.basicForm.value);
      this.toastr.success('Successfully submitted', 'Success');

      this.validSubmit = true;
      this.basicForm.reset();
    } else {
      console.log('error submit: ', this.basicForm.value);
      this.toastr.error('Please check again', 'Error');
    }
  }
}
