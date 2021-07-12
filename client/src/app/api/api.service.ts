import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'http://localhost:3000';

@Injectable()
export class ApiService {
   constructor(private http: HttpClient) { 
  }
  // Linkedin Company Profile General Resolution Endpoint
  getCompanyLinkedInUrl(data:{ domain: string, name: string }) {
    const { domain, name } = data;
    const query = `company_domain=${domain}&company_name=${name}`;
    return this.http.get(`${BASE_URL}/resolve?${query}`);
  }
  // Linkedin Company Profile Endpoint
  getCompanyLinkedInProfile(data: { linkedInUrl: string }) {
    const { linkedInUrl } = data;
    const query = `url=${linkedInUrl}`;
    return this.http.get(`${BASE_URL}?${query}`);
  }

  test() {
    return this.http.get(`${BASE_URL}/test`).toPromise();
  }

}
