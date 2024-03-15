import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DriverServiceService } from 'src/app/service/driver-service.service';

@Component({
  selector: 'app-seat-rows',
  templateUrl: './seat-rows.component.html',
  styleUrls: ['./seat-rows.component.css']
})
export class SeatRowsComponent {

  seatForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SeatRowsComponent>,
    private driverService: DriverServiceService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.seatForm = this.fb.group({
      seatRows: this.fb.array([])
    });
  }
  
  get seatRows() {
    return this.seatForm.get('seatRows') as FormArray;
  }

  addSeatRow() {
    const seatRow = this.fb.group({
      row: '',
      numberOfSeats: ''
    });
    this.seatRows.push(seatRow);
  }

  removeSeatRow(index: number) {
    this.seatRows.removeAt(index);
  }

  submit() {
    const formData = this.seatForm.value;
    formData.busId = this.data.busId;
    console.log('Response of add seats row: ');
    this.driverService.addSeatRows(formData).subscribe(response => {
      console.log('Response of add seats row: ', response);
      this.dialogRef.close(response);
    });
  }

}
