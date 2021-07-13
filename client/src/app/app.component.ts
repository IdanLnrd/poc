import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from './api/api.service';
import { DatasetService } from './data/dataset.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'LNRD.io';
  loading = false;
  result: any = {};
  company: {[key: string]: { domain: string, name: string } } = {};
  constructor(private api: ApiService, private dataset: DatasetService) {}
  
  ngOnInit() : void {
    
  }

  search(formControl: FormControl) {
    console.log('search:', formControl.value);
  }
}
