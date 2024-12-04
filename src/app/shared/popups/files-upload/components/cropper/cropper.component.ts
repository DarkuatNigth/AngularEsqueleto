import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { dataURLtoFile } from '../../utils';

@Component({
  selector: 'app-cropper',
  templateUrl: './cropper.component.html',
  styleUrls: ['./cropper.component.scss']
})
export class CropperComponent implements OnInit {

  @Input() objImageFile !: File;

  @Output() objChanged = new EventEmitter<File>();

  strCroppedImage !: string;

  constructor() { }

  ngOnInit(): void {
  }

  imageCropped($event: ImageCroppedEvent){
    this.strCroppedImage = $event.base64 as string;
  }


  onCrop():void{
      const objFile = dataURLtoFile(this.strCroppedImage, this.objImageFile);
      this.objChanged.emit(objFile);
  }

}
