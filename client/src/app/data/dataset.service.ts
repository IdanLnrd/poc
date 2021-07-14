import { Injectable } from '@angular/core';
import * as d3 from 'd3';
const companiesDatasetUrl = 'http://localhost:4200/assets/companies.csv';
const jobsDatasetUrl = 'http://localhost:4200/assets/jobs.csv';

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

  async jobs() {
    try {
      return await d3.csv(jobsDatasetUrl);
    } catch(e) {
      return [];
    }  
  }

}
