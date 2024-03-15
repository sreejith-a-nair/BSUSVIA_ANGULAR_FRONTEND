import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { JwtServiceService } from 'src/app/service/jwt-service.service';
import { TosterService } from 'src/app/service/toster.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  @Output() logoutEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private jwtService: JwtServiceService,
              private router: Router,
              private tostersrevice : TosterService){}

  ngOnInit(): void {
      this.jwtService.logout();
      this.tostersrevice.success("Logout successfuly completed");
      this.router.navigateByUrl("/authentication/login");
      this.emitLogoutEvent();
  }
  emitLogoutEvent(): void {
    this.logoutEvent.emit();
  }

}
