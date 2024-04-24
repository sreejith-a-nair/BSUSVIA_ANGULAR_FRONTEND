import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class TosterService {

  private errorMessagesDisplayed: Set<string> = new Set<string>();
  private successMessagesDisplayed: Set<string> = new Set<string>();
  private warningMessagesDisplayed: Set<string> = new Set<string>();

  constructor(private messageService : MessageService) { }

  success(message: string, content: string = 'Success') {
    if (!this.successMessagesDisplayed.has(message)) {
      this.successMessagesDisplayed.add(message);
      this.messageService.add({ severity: 'success', summary: content, detail: message });
    }
  }

  
  failed(message: string, content: string = 'Failed') {

    if (!this.errorMessagesDisplayed.has(message)) {
  
      this.errorMessagesDisplayed.add(message);
      this.messageService.add({ severity: 'error', summary: content, detail: message });
    }
   
  }

  warning(message: string, content: string = 'Warning') {
    if (!this.warningMessagesDisplayed.has(message)) {
      this.warningMessagesDisplayed.add(message);
      this.messageService.add({ severity: 'warn', summary: content, detail: message });
    }
  }

  clearWarningMessages() {
    this.warningMessagesDisplayed.clear();
  }

  clearSuccessMessages() {
    this.successMessagesDisplayed.clear();
  }

  clearErrorMessages() {
    this.errorMessagesDisplayed.clear();
  }

  error(message: string, amount: number, content: string = 'Failed') {
    const errorMessage = `${message}. Insufficient wallet balance Rs :  ${amount} `;
    if (!this.errorMessagesDisplayed.has(errorMessage)) {
        this.errorMessagesDisplayed.add(errorMessage);
        this.messageService.add({ severity: 'error', summary: content, detail: errorMessage });
        setTimeout(() => {
          window.location.reload(); 
      }, 3000);
    }
}
 
}
