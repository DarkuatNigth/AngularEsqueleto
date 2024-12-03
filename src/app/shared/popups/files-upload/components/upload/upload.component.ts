import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import firebase from 'firebase/app';
import { AngularFireStorage , AngularFireUploadTask } from '@angular/fire/storage';

import { Observable,finalize, takeUntil, Subject, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {
  @Input() objFile!: File;
  @Output() objCompleto = new EventEmitter<string>();

  cnoDownLoadURL !: string;

  objTask !: AngularFireUploadTask;

  objPercentage$ !: Observable<number>;

  objSnapshot$!: Observable<firebase.storage.UploadTaskSnapshot>;

  objDownloadURL !: string;

  private objDestroy = new Subject<void>();

  constructor(private objStorage : AngularFireStorage) { }

  ngOnInit(): void {
    this.startUpload();
  }

  ngOnDestroy(): void {
      this.objDestroy.next();
      this.objDestroy.complete();
  }

  startUpload(): void {
    if (!this.objFile) {
      console.error('No se proporcionó ningún archivo para subir.');
      return;
    }

    const safeFileName = this.objFile.name.replace(/[^a-zA-Z0-9.]/g, '_');
    const objPath = `${this.objFile.type.split('/')[0]}/${Date.now()}_${safeFileName}`;
    const objStorageRef = this.objStorage.ref(objPath);

    this.objTask = this.objStorage.upload(objPath, this.objFile);
    this.objPercentage$ = this.objTask.percentageChanges() as Observable<number>;

    this.objPercentage$.subscribe(progress => {
      console.log(`Progreso de subida: ${progress}%`);
    });

    this.objSnapshot$ = this.objTask.snapshotChanges() as Observable<firebase.storage.UploadTaskSnapshot>;

    this.objSnapshot$
      .pipe(
        takeUntil(this.objDestroy),
        finalize(async () => {
          try {
            const objStorageRefObservable$ = objStorageRef.getDownloadURL();
            this.objDownloadURL = await objStorageRefObservable$.toPromise();
            console.log('URL de descarga:', this.objDownloadURL);
            this.objCompleto.next(this.objDownloadURL);
          } catch (error) {
            console.error('Error al obtener la URL de descarga:', error);
          }
        })
      )
      .subscribe({
        error: (err) => console.error('Error durante la subida:', err),
      });
  }
}
