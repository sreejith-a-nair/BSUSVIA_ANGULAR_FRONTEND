import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdateWalletRequest } from 'src/app/core/interface/walletReq.model';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { TosterService } from 'src/app/service/toster.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {

 
  bookingId!: string;
  total !: number;
  paidAmount!:number;
  refundAmount!:number;
  totalFare: number= 0;
  userName!:string;
  additionalTotalFare:number= 0;
  WalletInfo:any;

  constructor(private route: ActivatedRoute,
              private jwtService : JwtServiceService,
              private userService: UserServiceService,
              private toastr: TosterService,
              private router: Router) {}
  
  ngOnInit() {


 const email:any=   this.jwtService.extractEmail();
  this.userService.getUseByEmail(email).subscribe(res=>{
  this.userName=res.firstName;

 
 })
 this.userService.getWallet(email).subscribe(response=>{
  
   console.log("user wallet >> ",response);
   this.total=response.totalAmount;
   this.refundAmount=response.refundAmount;
   this.paidAmount=response.payedAmount;
  
 })

  }

  showWalletHistory() {
   console.log("wallet hisrtory work ");

   this.router.navigateByUrl('/customer/walletHistory');
   
    }


}
