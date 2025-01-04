import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '@app/store/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  @Input() blEnSesion !: boolean | null;
  @Output() objSalir = new EventEmitter<void>();

  @Input() objUsuario !: Usuario | null;

  constructor(
    private objRouter: Router
  ) { }

  ngOnInit(): void {
  }

  public onSignOut(): void{
    this.objSalir.emit();
  }

  public onProfileNavigate(): void{
     const path = this.objUsuario ? this.objUsuario.strUid : 'new';
     this.objRouter.navigate(['/profile', path]);
  }
}
