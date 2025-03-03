import { Component, inject, signal, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FileListComponent } from '../../components/file-list/file-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadDialogComponent } from '../../components/file-upload-dialog/file-upload-dialog.component';
import { FileSearchComponent } from '../../components/file-search/file-search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconModule,
    FileListComponent,
    MatButtonModule,
    FileSearchComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  readonly dialog = inject(MatDialog);
  readonly fileList = viewChild(FileListComponent);
  searchText = signal<string | undefined>(undefined);

  openFileUploadDialog() {
    this.dialog.open(
      FileUploadDialogComponent
    )
    .afterClosed()
    .subscribe(fileSaved => {
      if (fileSaved) {
        this.fileList()?.loadFiles();
      }
    });
  }
}
