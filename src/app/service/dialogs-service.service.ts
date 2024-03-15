import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationMessageComponent } from '../customer/components/confirmation-message/confirmation-message.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsServiceService {

  constructor(private dialog : MatDialog) { }

  openConfirmDialog(mesg:string) {
    return this.dialog.open(ConfirmationMessageComponent, {
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data:{
        message:mesg
      }
    });
  }
}
