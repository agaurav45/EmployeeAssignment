import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  @Input() selectedEmployee: any;
  @Input() showEditModal: boolean;

  @Output() updateEmployee: EventEmitter<any> = new EventEmitter<any>();
  @Output() closeEditModal: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }
  
  closeModal() {
    this.showEditModal = false;
    this.closeEditModal.emit(this.showEditModal);
  }

  editEmployee() {
    this.updateEmployee.emit(this.selectedEmployee);

  }

}
