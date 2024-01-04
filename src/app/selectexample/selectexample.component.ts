import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'select-example',
  styleUrls: ['selectexample.component.css'],
  templateUrl: 'selectexample.component.html',

  //  standalone: true,
  //  imports: [MatFormFieldModule, MatSelectModule, MatInputModule, FormsModule],
 })
export class SelectexampleComponent {
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
}
