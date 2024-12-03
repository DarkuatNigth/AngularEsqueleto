import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appDropZone]'
})
export class DropZoneDirective {

  @Output() public objDropped = new EventEmitter<FileList>();
  @Output() public objHovered = new EventEmitter<boolean>();
  constructor() { }

  @HostListener('drop',['$event'])onDrop($event: any){
    $event.preventDefault();
    this.objDropped.emit($event.dataTransfer.files);
    this.objHovered.emit(false);
  }


  @HostListener('dragover',['$event'])onDragOver($event: any){
    $event.preventDefault();
    this.objHovered.emit(true);

  }


  @HostListener('dragLeave',['$event'])onDragLeave($event: any){
    $event.preventDefault();
    this.objHovered.emit(false);

  }
}
