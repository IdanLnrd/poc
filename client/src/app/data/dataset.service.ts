import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { environment } from 'src/environments/environment';
const host = environment.host;
const companiesDatasetUrl = `${host}/assets/companies.csv`;
const jobsDatasetUrl = `${host}/assets/jobs.csv`;

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
