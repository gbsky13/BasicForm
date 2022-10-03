import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BasicTypedFormModel } from './basicForm.config';
import { BasicFormModel } from './basicForm.model';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.css'],
})
export class BasicFormComponent implements OnInit {
  title = 'XXX Class Registration Form';
  basicForm: UntypedFormGroup;

  basicTypedForm: FormGroup<BasicTypedFormModel>;

  emailPattern = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  phoneNumberPattern = new RegExp(
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
  );

  resultbmi: Number;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {
    this.initForm();
    this.initTypedForm();
  }

  initForm() {
    this.basicForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null],
      gender: [null, Validators.required],
      birthday: [null, Validators.required],
      phone: [
        null,
        [Validators.required, Validators.pattern(this.phoneNumberPattern)],
      ],
      email: [
        null,
        [Validators.required, Validators.pattern(this.emailPattern)],
      ],
      weight: [null, Validators.required],
      height: [null, Validators.required],
      cvaccine: [null, Validators.required],
    });
  }

  initTypedForm() {
    this.basicTypedForm = new FormGroup<BasicTypedFormModel>({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      birthday: new FormControl(null, Validators.required),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(this.phoneNumberPattern),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.emailPattern),
      ]),
      weight: new FormControl(null, Validators.required),
      height: new FormControl(null, Validators.required),
      cvaccine: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    if (this.basicForm.valid) {
      this.toastr.success('Successfully submitted', 'Success');
      const submittedData: BasicFormModel = this.basicForm.value;
      console.log('success Submit with: ', submittedData);
      this.onReset();
    } else {
      console.log('error submit: ', this.basicForm.value);
      this.toastr.error('Please check again', 'Error');
    }

    console.log(
      'basicTypedForm.controls.birthday: ',
      this.basicTypedForm.controls.birthday
    );
  }

  onEnable() {
    this.basicForm.enable();
  }

  onDisable() {
    this.basicForm.disable();
  }

  onReset() {
    this.basicForm.reset();
    this.resultbmi = 0;
  }

  computebmi() {
    const weightVal = this.basicForm.controls.weight.value;
    const heightVal = this.basicForm.controls.height.value;

    var bmi = weightVal / (heightVal * heightVal);
    this.resultbmi = Number(bmi.toFixed(3));
    console.log(' resultbmi: ', this.resultbmi);
  }
}
