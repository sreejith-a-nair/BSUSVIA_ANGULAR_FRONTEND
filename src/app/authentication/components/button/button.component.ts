import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class AuthButtonComponent {

  @Input() disable !: boolean ;
  @Input() isSignup !: boolean ;
  @Output() clickEvent: EventEmitter<void> = new EventEmitter<void>();

  onClick() {
    this.clickEvent.emit();
  }

}
