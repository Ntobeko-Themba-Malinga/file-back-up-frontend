import { Component, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { debounceTime, map } from 'rxjs';

@Component({
  selector: 'app-file-search',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    FormsModule,
    MatInputModule,
  ],
  templateUrl: './file-search.component.html',
  styleUrl: './file-search.component.css'
})
export class FileSearchComponent implements OnInit {
  form = new FormGroup({
    search: new FormControl<string>("")
  });
  searchText = output<string>();

  ngOnInit(): void {
      this.form.valueChanges.pipe(
        debounceTime(600),
        map((res) => res)
      ).subscribe(res => {
        if (res.search?.length !== undefined && (res.search?.length >= 3 || res.search?.length === 0)) {
          this.searchText.emit(res.search);
        } else {
          // 
        }
      });
  }
}
