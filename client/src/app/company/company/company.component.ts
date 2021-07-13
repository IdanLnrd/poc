import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  @Output() similarSelected = new Subject<any>();
  @Input() data: any;
  constructor() { }

  ngOnInit(): void {
  }

}
