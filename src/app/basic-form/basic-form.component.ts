import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BasicTypedFormModel } from './basicTypedform.config';
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

  // resultbmi: number;
  psubmittedData: any;
  resetAllData: Boolean;
  concateName?: String;
  age?: Number;
  bmi?: Number;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {}

  ngOnInit() {
    // this.initForm();
    this.initTypedForm();
    this.resetAllData = false;
  }

  initForm() {
    this.basicForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
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
        Validators.email,
      ]),
      weight: new FormControl(0, Validators.required),
      height: new FormControl(0, Validators.required),
      cvaccine: new FormControl('', Validators.required),
    });
  }

  onSubmit() {
    this.resetAllData = false;

    if (this.basicTypedForm.valid) {
      this.toastr.success('Successfully submitted', 'Success');
      // const submittedData: BasicFormModel = this.basicForm.value;
      this.psubmittedData = this.basicTypedForm.value;
      console.log('success submit with: ', this.psubmittedData);
      this.onResetForm();
    } else {
      console.log('error submit with value: ', this.basicTypedForm.value);
      this.toastr.error('Please check again', 'Error');
    }

    // console.log(
    //   'basicTypedForm.controls.birthday: ',
    //   this.basicTypedForm.controls.birthday
    // );
    // console.log(typeof this.basicTypedForm.controls.birthday)
  }

  onEnable() {
    // this.basicForm.enable();
    this.basicTypedForm.enable();
  }

  onDisable() {
    // this.basicForm.disable();
    this.basicTypedForm.disable();
  }

  onResetForm() {
    // this.basicForm.reset();
    this.basicTypedForm.reset();
  }

  onResetAll() {
    // this.basicForm.reset();
    this.basicTypedForm.reset();
    this.concateName = '';
    this.age = 0;
    this.bmi = 0;
    this.resetAllData = true;
  }

  //compute bmi for untypedform
  // computebmi() {
  //
  //   const weightVal = this.basicForm.controls.weight.value;
  //   const heightVal = this.basicForm.controls.height.value;

  //   var rbmi = weightVal / (heightVal * heightVal);
  //   this.resultbmi = Number(rbmi.toFixed(3));
  //   console.log('result bmi : ', this.resultbmi);
  // }

  // //compute bmi for typedform ==>  refer https://bobbyhadz.com/blog/typescript-left-hand-side-of-arithmetic-operation-must-be-type
  // computebmi() {
  //   const weightVal = this.basicTypedForm.controls.weight.value;
  //   const heightVal = this.basicTypedForm.controls.height.value;
  //   console.log(weightVal, heightVal);

  //   var bmi = Number(weightVal) / (Number(heightVal) * Number(heightVal));
  //   this.resultbmi = Number(bmi.toFixed(3));
  //   console.log('result bmi : ', this.resultbmi);
  // }
}
