import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FileService } from '../../services/file.service';
import { File } from '../../model/file.type';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [
    MatTableModule, 
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './file-list.component.html',
  styleUrl: './file-list.component.css'
})
export class FileListComponent implements OnInit {
  fileService = inject(FileService);
  files = signal<File[] | undefined>(undefined);
  fileDataSource: MatTableDataSource<File> = new MatTableDataSource<File>();
  fileDisplayColumns = ["fileName", "fileType", "button"];

  constructor() {
    effect(() => {
      this.fileDataSource = new MatTableDataSource(this.files());
    });
  }

  ngOnInit(): void {
      this.loadFiles();
  }

  loadFiles() {
    this.fileService.getAllFiles()
    .subscribe({
      next: (newFiles) => {
        this.files.set(newFiles)
      },
      error: (_err) => {
        console.log("LOL things went sideways, try reloading page");
      }
    })
  }

  removeFile(file: File) {
    this.files.set(this.files()?.filter(
      (displayFile) => displayFile.fileId !== file.fileId
    ));
  }

  deleteFile(file: File) {
    this.fileService.deleteFileById(file.fileId)
    .subscribe({
      next: (_res) => {
        this.removeFile(file);
      },
      error: (err) => {
        console.log("Lol something went wrong. Try reloading the page");
      }
    });
  }

  downloadFile(file: File) {
    this.fileService.downloadFile(file.fileId)
    .subscribe({
      next: (res) => {
        let blob: Blob = res.body as Blob;
        const link = document.createElement('a');
        const objectUrl = URL.createObjectURL(blob);
        link.href = objectUrl;
        link.download = file.fileName;
        link.click();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
