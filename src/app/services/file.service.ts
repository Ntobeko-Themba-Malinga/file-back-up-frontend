import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { File } from '../model/file.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  http = inject(HttpClient);
  baseUrl = "http://localhost:8080/files";

  getAllFiles(): Observable<File[]> {
    return this.http.get<File[]>(this.baseUrl);
  }
}
