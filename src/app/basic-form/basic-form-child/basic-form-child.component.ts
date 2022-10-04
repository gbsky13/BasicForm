import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BasicFormModel } from '../basicForm.model';

@Component({
  selector: 'app-basic-form-child',
  templateUrl: './basic-form-child.component.html',
  styleUrls: ['./basic-form-child.component.css'],
})
export class BasicFormChildComponent implements OnInit, OnChanges {
  @Input() csubmittedData;
  @Input() bmiForm: FormGroup;
  @Input() resetAllData;
  @Output() fromChildEmitter$ = new EventEmitter<String>(); //emitter=obsevable
  @Output() fromChildEmitter2$ = new EventEmitter<Number>();
  @Output() fromChildEmitter3$ = new EventEmitter<Number>();
  @Output() fromBMIModelEmitter$ = new EventEmitter<BMIModel>();
  // @Output() fromChildEmitter3$ = new EventEmitter<{
  //   bmi: number;
  //   statusbmi: string;
  // }>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['csubmittedData'];
    console.log(change);
    if (change && change.currentValue) {
      this.concateName();
      this.computeAge();
      this.computeBMI();
    }
  }

  title = 'Hello from child';
  ngOnInit() {
    // declare
    const weight = this.bmiForm.controls.weight;
    const height = this.bmiForm.controls.height;

    weight.valueChanges.subscribe(() => {
      this.computeBMI();
      // console.log(this)
    });
  }

  concateName() {
    const newName =
      this.csubmittedData.firstName + ' ' + this.csubmittedData.lastName;
    this.fromChildEmitter$.emit(newName);
  }

  computeAge() {
    const currentdate = new Date();
    const birthd = new Date(this.csubmittedData.birthday);
    // console.log(typeof this.basicTypedForm.controls.birthday.value);
    const age = currentdate.getFullYear() - birthd.getFullYear();
    this.fromChildEmitter2$.emit(age);
  }

  // compute bmi for typedform ==>  refer https://bobbyhadz.com/blog/typescript-left-hand-side-of-arithmetic-operation-must-be-type
  // computeBMI() {
  //   const weightVal = this.csubmittedData.weight;
  //   const heightVal = this.csubmittedData.height;
  //   console.log(weightVal, heightVal);

  //   var bmi = Number(weightVal) / (Number(heightVal) * Number(heightVal));
  //   this.fromChildEmitter3$.emit(bmi);
  // }

  computeBMI() {
    console.log(this.csubmittedData);
    let bmiModel: BMIModel;
    const weightVal = this.csubmittedData.weight;
    const heightVal = this.csubmittedData.height;

    var bmi = Number(weightVal) / (Number(heightVal) * Number(heightVal));

    let statusbmi = '';

    if (bmi < 0) {
      statusbmi = 'Not Normal Maybe You Alien';
    } else if (bmi > 0 && bmi <= 18.5) {
      statusbmi = 'Underweight';
    } else if (bmi > 18.5 && bmi <= 24.9) {
      statusbmi = 'Healthy';
    } else if (bmi > 24.9 && bmi <= 29.9) {
      statusbmi = 'Overweight';
    } else {
      statusbmi = 'Obesity';
    }
    bmiModel = {
      bmi: bmi,
      statusBmi: statusbmi,
    };
    // this.fromChildEmitter3$.emit({bmi, statusbmi});
    this.fromBMIModelEmitter$.emit(bmiModel);
    console.log('bmi:', bmiModel);
  }
}

export interface BMIModel {
  bmi: number;
  statusBmi: string;
}
