import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() blEnSesion !: boolean | null;
  @Output() objSalir = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  public onSignOut(): void{
    this.objSalir.emit();
  }

}
