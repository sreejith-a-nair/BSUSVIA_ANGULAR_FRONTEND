import { NgModule } from "@angular/core";
import { NgModel } from "@angular/forms";
import { AuthButtonComponent } from "../authentication/components/button/button.component";
import { CommonModule } from "@angular/common";
import { ButtonModule } from 'primeng/button';
import { CommontableComponent } from "./commontable/commontable.component";
import { MatCustomModule } from "./mat_custom_module";
import { CommonDialogComponent } from "./common-dialog/common-dialog.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

@NgModule({
    declarations : [
        AuthButtonComponent,
        CommontableComponent,
        CommonDialogComponent,
   
    ],
    exports :[
        AuthButtonComponent,
        CommontableComponent,
        CommonDialogComponent
       
    ],
    imports :[
        CommonModule,
        ButtonModule,
        MatCustomModule,
        FormsModule, 
        ReactiveFormsModule

    ],
})
export class ReusableComponentsModule{

}