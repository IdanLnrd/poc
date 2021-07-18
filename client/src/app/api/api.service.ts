import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const BASE_URL = environment.api;
@Injectable()
export class ApiService {
   constructor(private http: HttpClient) { 
     console.log('api:baseurl: ', BASE_URL);
  }

  // Linkedin Company Profile Endpoint
  getCompanyLinkedInProfile(data: { linkedInUrl: string }): Observable<any> {
    const { linkedInUrl } = data;
    const query = `query={company(linkedInUrl:"${linkedInUrl}")}`;
    return this.http.get(`${BASE_URL}?${query}`);
  }
}
