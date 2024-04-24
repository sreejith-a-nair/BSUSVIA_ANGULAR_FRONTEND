import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { TosterService } from 'src/app/service/toster.service';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css']
})
export class AddCouponComponent {

  addcouponForm!: FormGroup;
  minDate!: string; 
  maxDate!: string;

  constructor(private formBuilder: FormBuilder,private adminService : AdminServiceService,  private tostersrevice : TosterService,
    private snackBar: MatSnackBar ,private dialogRef: MatDialogRef<AddCouponComponent>) { }

    ngOnInit(): void {
      this.initForm();
      this.setMinMaxDates();
    }

    initForm(): void {
      
      this.addcouponForm = this.formBuilder.group({
        couponName: ['', [Validators.required, Validators.pattern('^[A-Za-z]{4}[A-Za-z\\s-]*[A-Za-z]$')]],
        couponCode: ['', [Validators.required, Validators.pattern('^[A-Z]{4}[A-Z\\s-]*[A-Z]$')]],
        expiryDate: ['', [Validators.required, this.validateExpiryDate]],
        count: ['', [Validators.required, Validators.min(1)]],
        maxPrice: ['', [Validators.required, Validators.min(1)]],
        minFare: ['', [Validators.required, Validators.min(1)]],
        offPercent: ['', [Validators.required, Validators.min(1), Validators.max(100)]]
      });
    }

  handleAddBusSubmit() {

    console.log("Entered values in add coupon : ",this.addcouponForm.value);
    const formData = this.addcouponForm.value;
    
    const couponData: any ={
      uuid:formData.uuid,
      couponName:formData.couponName,
      couponCode : formData.couponCode,
      expiryDate:formData.expiryDate,
      count:formData.count,
      maxPrice:formData.maxPrice,
      offPercent:formData.offPercent,
      minFare:formData.minFare
    }

    this.adminService.addCoupon(couponData).subscribe((res)=>{
      console.log("Success ");
      this.tostersrevice.success("Coupon added succesfully ")
      this.onSuccess() 

    },(err)=>{
      console.log("erorr");
      this.tostersrevice.failed("Coupon already exist ")
      
    })
  }

  onSuccess() {
    this.dialogRef.close();
    location.reload();
}

setMinMaxDates(): void {
  const currentDate = new Date();
  this.minDate = currentDate.toISOString().split('T')[0];

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1); // One year from today
  this.maxDate = maxDate.toISOString().split('T')[0];
}

validateExpiryDate(control: any): { [key: string]: any } | null {
  const selectedDate = new Date(control.value);
  const currentDate = new Date();
  if (selectedDate < currentDate) {
    return { 'invalidDate': true }; // Error if expiry date is before the current date
  }
  return null;
}

}
