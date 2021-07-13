import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:3000';

@Injectable()
export class ApiService {
   constructor(private http: HttpClient) { 
  }

  // Linkedin Company Profile Endpoint
  getCompanyLinkedInProfile(data: { linkedInUrl: string }): Observable<any> {
    const { linkedInUrl } = data;
    const query = `url=${linkedInUrl}`;
    return this.http.get(`${BASE_URL}/company?${query}`);
  }

  getJobs(data: {  search_id: string }): Observable<any> {
    const { search_id } = data;
    const query = `search_id=${search_id}`;
    return this.http.get(`${BASE_URL}/jobs?${query}`);
  }
}
