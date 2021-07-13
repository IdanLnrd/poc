import { Injectable } from '@angular/core';
import * as d3 from 'd3';
const companiesDatasetUrl = 'http://localhost:4200/assets/companies.csv';

@Injectable()
export class DatasetService {

  constructor() { 
    
    
  }
  async companies() {
    try {
      return await d3.csv(companiesDatasetUrl);
    } catch(e) {
      return [];
    }  
  }
}
