import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';

import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AutocompleteComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,    
    MatFormFieldModule,
    MatAutocompleteModule
  ],
  exports: [ AutocompleteComponent ]
})
export class AutocompleteModule { }
