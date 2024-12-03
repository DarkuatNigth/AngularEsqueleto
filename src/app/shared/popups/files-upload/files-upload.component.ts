import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface objDialogData {
  bstMultiple: boolean;
  bstCrop: boolean;
}

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss']
})
export class FilesUploadComponent implements OnInit {
  bstIsHoreving ?: boolean;
  lstArchivos : File[] = [];
  objArchivoImagen !: File | null;
  bstIsError!: boolean;

  objFilesURLs : string[] = [];

  constructor(
    private objDialogRef: MatDialogRef<FilesUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public objData: objDialogData
  ) { }

  ngOnInit(): void {
  }

  toggleHover(event:boolean) : void {
    this.bstIsHoreving = event;
  }

  onDrop(lstFile : FileList): void {
    this.dropGeneral(lstFile);
  }

  onDropFile(lstFile : FileList| any ):void{
    this.dropGeneral(lstFile.target.files);
  }

  dropGeneral(lstFile: FileList):void{
    this.bstIsError = false;
    if(this.objData.bstCrop && lstFile.length >1){
      this.bstIsError = true;
      return;
    }

    if(this.objData.bstCrop && lstFile.length === 1 && lstFile.item(0)?.type.split('/')[0] === 'image') {
      this.objArchivoImagen = lstFile.item(0) as File;
      return;
    }

    for (let index = 0; index < lstFile.length; index++) {
      this.lstArchivos.push(lstFile.item(index) as File );

    }
    console.log(lstFile);
  }

  onUploadComplete(strUrl:string):void{
    this.objFilesURLs.push(strUrl);
    console.log(this.objFilesURLs);
  }

  onComplete(): void {
    const res = this.objData.bstMultiple ? this.objFilesURLs : this.objFilesURLs[0];
    this.objDialogRef.close(res);
}

onClose(): void {
  this.objDialogRef.close();

}

onCrop(file: File): void {
  this.objArchivoImagen = null;
  this.lstArchivos.push(file);
}
}
