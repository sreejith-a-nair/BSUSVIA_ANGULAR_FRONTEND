import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.css']
})
export class CommonDialogComponent {
  @Input() title: string = 'Dialog Title';
  @Input() form!: FormGroup;
  @Input() fields!: any[];
  // @Input() onSubmit: () => void;

}
