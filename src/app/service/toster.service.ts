import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class TosterService {
  error(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private messsageService : MessageService) { }

  success(msg:string , content:string ="success"){

    this.messsageService.add({ severity: "success", summary: content, detail: msg });

  }
  failed(msg : string , content : string ="failed"){
    this.messsageService.add({ severity: "error", summary: content, detail: msg });
  }

 
}
