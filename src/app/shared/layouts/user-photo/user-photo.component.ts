import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { SafeStyle, DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-user-photo',
  templateUrl: './user-photo.component.html',
  styleUrls: ['./user-photo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPhotoComponent implements OnInit {

  @Input() objFotoUrl!: string | null | undefined;
  constructor(
    private objSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
  }

  get safeFotoUrl(): SafeStyle | null{
    return this.objFotoUrl ? this.objSanitizer.bypassSecurityTrustStyle(`url(${this.objFotoUrl})`): null;
  }
}
