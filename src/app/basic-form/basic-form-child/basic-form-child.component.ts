import { Component, Input, OnInit } from '@angular/core';
import { BasicFormModel } from '../basicForm.model';

@Component({
  selector: 'app-basic-form-child',
  templateUrl: './basic-form-child.component.html',
  styleUrls: ['./basic-form-child.component.css'],
})
export class BasicFormChildComponent implements OnInit {
  @Input() csubmittedData;

  constructor() {}

  title = 'Hello from child';
  ngOnInit() {}
}
