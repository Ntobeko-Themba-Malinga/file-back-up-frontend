import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FileListComponent } from '../../components/file-list/file-list.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatIconModule,
    FileListComponent,
    MatButtonModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
