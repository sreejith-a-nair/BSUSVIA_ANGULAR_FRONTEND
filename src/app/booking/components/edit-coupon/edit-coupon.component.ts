import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CouponInfo } from 'src/app/core/interface/couponRequest.model';
import { AdminServiceService } from 'src/app/service/admin-service.service';
import { AuthorityServiceService } from 'src/app/service/authority-service.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';

@Component({
  selector: 'app-edit-coupon',
  templateUrl: './edit-coupon.component.html',
  styleUrls: ['./edit-coupon.component.css']
})
export class EditCouponComponent {
  editCouponForm!: FormGroup;
  couponData!: CouponInfo;

  constructor(private formBuilder: FormBuilder,
    private adminService: AdminServiceService,
    private dialogRef: MatDialogRef<EditCouponComponent>,
    private jwtService: JwtServiceService,
    private ngxService: NgxUiLoaderService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.couponData = this.data.couponData;
    this.editCouponForm = this.formBuilder.group({
      uuid: [this.couponData.uuid, Validators.required],
      couponName: [this.couponData.couponName, Validators.required],
      couponCode: [this.couponData.couponCode, Validators.required],
      expiryDate: [this.couponData.expiryDate, Validators.required],
      count: [this.couponData.count, Validators.required],
      maxPrice: [this.couponData.maxPrice, Validators.required],
      offPercent: [this.couponData.offPercent, Validators.required],
      minFare: [this.couponData.minFare, Validators.required]
    });
  }

  handleAddCouponSubmit(): void {
    const couponId = this.couponData.uuid;
    if (this.editCouponForm.valid) {
      const formData = this.editCouponForm.value;
      const couponData: any = {
        couponName: formData.couponName,
        couponCode: formData.couponCode,
        expiryDate: formData.expiryDate,
        count: formData.count,
        maxPrice: formData.maxPrice,
        offPercent: formData.offPercent,
        minFare: formData.minFare 
      };

      this.adminService.updateCoupon(couponData, couponId).subscribe(response => {
        console.log('Coupon updated successfully:', response);
        this.dialogRef.close();
      }, error => {
        console.error('Error updating coupon:', error);
        
      });
    }
  }
}
