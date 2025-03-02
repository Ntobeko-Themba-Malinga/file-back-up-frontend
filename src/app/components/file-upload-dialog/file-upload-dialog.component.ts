import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-file-upload-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    ReactiveFormsModule,
  ],
  templateUrl: './file-upload-dialog.component.html',
  styleUrl: './file-upload-dialog.component.css'
})
export class FileUploadDialogComponent {
  readonly dialogRef = inject(MatDialogRef<FileUploadDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA)
  readonly fileService = inject(FileService);
  file!: File;

  onFileChange(event: any) {
    this.file = event.target.files.item(0);
  }

  onSubmit() {
    if (this.file !== undefined) {
      const formData = new FormData();
      formData.append("file", this.file);

      this.fileService.saveFile(formData)
      .subscribe({
        next: (_res) => {
          console.log("File successfully saved");
          this.dialogRef.close({ fileSaved: true });
        },
        error: (err) => {
          console.log(err);
          console.log("LOL something went wrong. Try reloading the page");   
        }
      });
    } else {
      console.log("Lol things went sideways. Please refresh page");
    }
  }
}
