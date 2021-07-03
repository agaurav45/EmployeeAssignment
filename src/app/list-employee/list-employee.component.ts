import { Component, OnInit } from '@angular/core';

import { EmployeeService } from "../employee.service";
import { Employee } from "../employee";

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {
  employees: Employee[] = [];
  deletedEmployees: Employee[] = [];
  
  selectedEmployee:any;
  showEditModal:boolean = false;

  showAddModal:boolean = false;
  employeeCount: number;

  constructor(private employeeService: EmployeeService) {
  }

  ngOnInit(): void {
    this.getEmployeeData();
  }

  getEmployeeData() {
    this.employeeService.getEmployeesList()
      .subscribe(
        data => {
          this.employees = data;
          this.employeeCount = this.employees.length;
          this.addDistance();
        },
        error => console.log(error));
  }

  editEmployee(id: number) {
    this.selectedEmployee = this.employees.find(e => e.id == id);
    this.showEditModal = true;
  }

  updateEmployee(employee: any) {
    this.showEditModal = false;
  }

  closeEditModal(isOpen: any) {
    this.showEditModal = false;
  }

  showModal() {
    this.showAddModal = true;
  }

  addEmployee(employee: any) {
    if(employee.name) {
      employee['id'] = ++this.employeeCount;
      this.employees.push(JSON.parse(JSON.stringify(employee)));
    }
    
    this.showAddModal = false;
  }

  closeAddModal(isOpen: any) {
    this.showAddModal = false;
  }

  deleteEmployee(id: number) {
    this.deletedEmployees.push(this.employees.splice(this.findIndex(id), 1)[0]);
  }

  restoreEmployee(id: number) {
    this.employees.push(this.deletedEmployees.splice(this.findDeletedIndex(id), 1)[0]);
  }

  findIndex(id: number) {
    return this.employees.findIndex(e => e.id == id);
  }

  findDeletedIndex(id: number) {
    return this.deletedEmployees.findIndex(e => e.id == id);
  }

  addDistance() {
    this.employees.forEach(e=> {
      e.distance = this.calculateDistance(e.address.geo.lat, e.address.geo.lng);;
    });

    this.sortByDistance();
  }

  calculateDistance(lat: any, lon: any) {
    var R = 6371; // km
    var dLat = this.toRad(lat);
    var dLon = this.toRad(lon);
    var lat1 = this.toRad(0);
    var lat2 = this.toRad(0);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    
    return d;
  }

  toRad(val: any) {
    return val * Math.PI / 180;
  }

  sortByDistance() {
    return this.employees.sort(function(a, b) {
      var x = a.distance; 
      var y = b.distance;
      
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

}
