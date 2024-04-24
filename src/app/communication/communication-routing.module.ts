import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunicationComponent } from './communication.component';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [{ path: '', component: CommunicationComponent },
                        { path: 'chat', component: ChatComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunicationRoutingModule { }
