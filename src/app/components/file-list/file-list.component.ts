import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FileService } from '../../services/file.service';
import { File } from '../../model/file.type';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-file-list',
  standalone: true,
  imports: [
    MatTableModule, 
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
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
}
