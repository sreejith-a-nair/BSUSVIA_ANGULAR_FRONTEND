import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { WalletResponse } from 'src/app/core/interface/walletResponse.model';
import { AuthorityServiceService } from 'src/app/service/authority-service.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { TosterService } from 'src/app/service/toster.service';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-wallet-history',
  templateUrl: './wallet-history.component.html',
  styleUrls: ['./wallet-history.component.css']
})
export class WalletHistoryComponent {



  walletInfo: WalletResponse[] = [];


  constructor(private authorityService: AuthorityServiceService,
    private jwtservice:JwtServiceService,
    private route: ActivatedRoute,
    private toster :TosterService,
    private router : Router,
    private userService:UserServiceService) {

}



HeadingArray = [
  { Head: 'Amount', bodyKey: 'refundBookingAmount' },
  { Head: 'Cash Added/Received', bodyKey: 'isCashAdded' },
  { Head: 'Status', bodyKey: 'walletStatus' },
  { Head: 'Transaction Date', bodyKey: 'transactionDate' }
];



ngOnInit(): void {
  // this.route.queryParams.subscribe(params => {
 
    const email:string|null=this.jwtservice.extractEmail();
    console.log("get  user  mail ",email);
    
    this.authorityService.getUserWalletHistory(email).subscribe(walletHistory=>{
      console.log("get all walletHistory by mail ",walletHistory);
      
       

      // this.walletInfo=walletHistory;
      this.walletInfo = walletHistory.map((item: { transactionDate: string | number | Date; }) => {
      
        const transactionDate = new Date(item.transactionDate);
       
        const formattedTransactionDate = transactionDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        });
        return { ...item, transactionDate: formattedTransactionDate };
      });
      console.log("wallet info ",);
      
      
    },er=>{
      console.log("User have no wallet history ! ");
    this.toster.failed("User have no wallet history !");
    });
    
  
}

backToWallet() {
  console.log("wallet worked >>>");
  this.router.navigate(['/customer/userWallet']);
  }
  

}
