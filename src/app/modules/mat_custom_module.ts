import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDialogModule } from "@angular/material/dialog";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTabsModule } from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from "@angular/material/core";
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker' ;
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    imports : [
        MatCardModule, 
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCheckboxModule, 
        MatRadioModule,
        MatDialogModule,
        MatTableModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatExpansionModule,
        MatTabsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMaterialTimepickerModule ,
        MatSnackBarModule
      
        // MatTimepickerModule
        
        
    ],
    exports :[
        MatCardModule, 
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatCheckboxModule, 
        MatRadioModule,
        MatDialogModule,
        MatTableModule,
        MatMenuModule,
        MatPaginatorModule,
        MatSortModule,
        MatIconModule,
        MatListModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatSidenavModule,
        MatExpansionModule,
        MatTabsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxMaterialTimepickerModule ,
        MatSnackBarModule,
    
        
    ]
})
export class MatCustomModule{

}