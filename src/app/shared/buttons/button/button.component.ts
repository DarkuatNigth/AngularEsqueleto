import { Component, Input, OnInit } from '@angular/core';
export type objButtonType = 'button' | 'submit';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() objType: objButtonType ;
  constructor() {
    this.objType = 'button';
   }

  ngOnInit(): void {
  }

}
