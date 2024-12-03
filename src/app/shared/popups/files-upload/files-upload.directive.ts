import { Directive,EventEmitter, HostListener, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FilesUploadComponent } from './files-upload.component';

@Directive({
  selector: '[appFilesUpload]'
})
export class FilesUploadDirective {
  @Input() public bstVarios !: boolean;
  @Input() public bstCrop !: boolean;

  @Output() public objChanged = new EventEmitter<string | string[]>();


  constructor(private objDialog: MatDialog) { }

  @HostListener('click',['event']) onclick (){
    this.openDialog();
  }

  private openDialog(): void{
    const objDialogRef = this.objDialog.open(FilesUploadComponent,{
      width: '550px',
      height: '500px',
      data:{
        bstMultiple : this.bstVarios,
        bstCrop : this.bstCrop
      }
    });

    objDialogRef.afterClosed().subscribe(objResult => {
      this.objChanged.emit(objResult || null);
    });
  }

}
