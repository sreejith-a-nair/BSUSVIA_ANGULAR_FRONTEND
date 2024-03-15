import { Component ,Inject, inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef,MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AddBusComponent } from 'src/app/authority/components/add-bus/add-bus.component';
import { AuthorityServiceService } from 'src/app/service/authority-service.service';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-confirmation-message',
  templateUrl: './confirmation-message.component.html',
  styleUrls: ['./confirmation-message.component.css']
})
export class ConfirmationMessageComponent {


  
  constructor(private formBuilder: FormBuilder,
             @Inject(MAT_DIALOG_DATA) public data: any,
              private authorityService: AuthorityServiceService,
              private dialogRef: MatDialogRef<ConfirmationMessageComponent>,
              private dialogs:MatDialog,
              private jwtService : JwtServiceService,
              private ngxService: NgxUiLoaderService,
              private router : Router) { }

    ngOnInit(): void {


    }

    closeDialog() {
      this.dialogRef.close(false);
      }

}
