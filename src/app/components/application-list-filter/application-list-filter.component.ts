import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-application-list-filter',
  templateUrl: './application-list-filter.component.html',
  styleUrls: ['./application-list-filter.component.css']
})
export class ApplicationListFilterComponent {

 @Output() filterApplied: EventEmitter<{ date: Date, status: string}> = new EventEmitter();
 @Output() onFilterReset: EventEmitter<null> = new EventEmitter();

  selectedStatus!: string;
  selectedDate: Date; 
  filterForm: FormGroup;
  


  constructor(private fb: FormBuilder) {
    this.selectedDate = new Date;

    this.filterForm = this.fb.group({
      selectedDate: new FormControl(),
      selectedStatus: new FormControl()
    });
  }

  get filterDateControl() {
    return this.filterForm.get('selectedDate');
  }
  get selectedStatusControl() {
    return this.filterForm.get('selectedStatus');
  }

  onFilterSubmit() {
    this.filterApplied.emit({ date: this.filterDateControl?.value, status: this.selectedStatusControl?.value });
  }

  resetForm(){
    this.filterForm.reset();
    this.onFilterReset.emit(null);
  }
}
