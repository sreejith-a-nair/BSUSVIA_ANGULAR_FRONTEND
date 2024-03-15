import { Component } from '@angular/core';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  mapHtml: string | undefined;


  constructor(private mapService: UserServiceService) { }

  ngOnInit(): void {
    console.log("map woks");
    
    this.mapService.getMapHtml().subscribe(html => {
      this.mapHtml = html;
    });
  }
}


