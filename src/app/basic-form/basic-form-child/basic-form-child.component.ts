import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { BasicFormModel } from '../basicForm.model';

@Component({
  selector: 'app-basic-form-child',
  templateUrl: './basic-form-child.component.html',
  styleUrls: ['./basic-form-child.component.css'],
})
export class BasicFormChildComponent implements OnInit, OnChanges {
  @Input() csubmittedData;
  @Input() resetAllData;
  @Output() fromChildEmitter$ = new EventEmitter<String>(); //emitter=obsevable
  @Output() fromChildEmitter2$ = new EventEmitter<Number>();
  @Output() fromChildEmitter3$ = new EventEmitter<Number>();
  @Output() fromChildEmitter4$ = new EventEmitter<String>();

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['csubmittedData'];
    if (change && change.currentValue) {
      this.concateName();
      this.computeAge();
      this.computeBMI();
    }
  }

  title = 'Hello from child';
  ngOnInit() {}

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

  //compute bmi for typedform ==>  refer https://bobbyhadz.com/blog/typescript-left-hand-side-of-arithmetic-operation-must-be-type
  computeBMI() {
    const weightVal = this.csubmittedData.weight;
    const heightVal = this.csubmittedData.height;
    console.log(weightVal, heightVal);

    var bmi = Number(weightVal) / (Number(heightVal) * Number(heightVal));
    this.fromChildEmitter3$.emit(bmi);

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

    this.fromChildEmitter4$.emit(statusbmi);
  }
}
