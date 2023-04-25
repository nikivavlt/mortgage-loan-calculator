import { Component } from '@angular/core';
import { DropDownItem } from 'src/app/interfaces/application-form-interfaces';

@Component({
  selector: 'app-application-list-filter',
  templateUrl: './application-list-filter.component.html',
  styleUrls: ['./application-list-filter.component.css']
})
export class ApplicationListFilterComponent {
  

  selectedValue: string;
  selectedDate: Date; 
  isNew: boolean; 
  isInProgress: boolean; 
  isDone: boolean; 
  isRejected: boolean; 
  


  constructor() {
 
    this.selectedValue = '';
    this.selectedDate = new Date;
    this.isNew = false;
    this.isInProgress = false;
    this.isDone = false;
    this.isRejected = false;
}
}
