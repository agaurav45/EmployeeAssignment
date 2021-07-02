import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Employee } from "../employee";


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  @Input() showAddModal: boolean;

  @Output() addEmployee: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeAddModal: EventEmitter<any> = new EventEmitter<any>();

  employee: Employee = new Employee();

  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.showAddModal = false;
    this.closeAddModal.emit(this.showAddModal);
  }

  saveEmployee() {
    this.addEmployee.emit(this.employee);

  }

}
