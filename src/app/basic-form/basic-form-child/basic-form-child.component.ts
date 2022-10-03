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
  @Output() fromChildEmitter$ = new EventEmitter<String>(); //emitter=obsevable

  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    const change = changes['csubmittedData'];
    if (change && change.currentValue) {
      this.concateName();
    }
  }

  title = 'Hello from child';
  ngOnInit() {}

  concateName() {
    const newName =
      this.csubmittedData.firstName + this.csubmittedData.lastName;
    this.fromChildEmitter$.emit(newName);
  }
}
