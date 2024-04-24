import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunicationRoutingModule } from './communication-routing.module';
import { CommunicationComponent } from './communication.component';
import { MatCustomModule } from '../modules/mat_custom_module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';


@NgModule({
  declarations: [
    CommunicationComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    CommunicationRoutingModule,
    MatCustomModule,
    FormsModule,
    // RouterModule,
    ReactiveFormsModule
  ]
})
export class CommunicationModule { }
