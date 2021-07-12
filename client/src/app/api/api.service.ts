import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const BASE_URL = 'https://nubela.co/proxycurl/api/linkedin/company';

const Authorization = { Bearer: '8048c8d1-b607-4400-9f58-c056e247879e' }

@Injectable()
export class ApiService {
  private headers = { 
    'Authorization': `Bearer ${Authorization.Bearer}`,
    'Accept': '*/*',
    'Access-Control-Allow-Origin': '*'
  };
  constructor(private http: HttpClient) { 
  }
  // Linkedin Company Profile General Resolution Endpoint
  //    https://nubela.co/proxycurl/api/linkedin/company/resolve?location=sg&company_domain=nubela.co&company_name=Nubela

  getCompanyLinkedInUrl(data:{ domain: string, name: string }) {
    const { domain, name } = data;
    const query = `company_domain=${domain}&company_name=${name}`;
    return this.http.get(`${BASE_URL}/resolve?${query}`, { headers: this.headers });
  }
  // Linkedin Company Profile Endpoint
  getCompanyLinkedInProfile(data: { linkedInUrl: string }) {
    const { linkedInUrl } = data;
    const query = `url=${linkedInUrl}`;
    return this.http.get(`${BASE_URL}?${query}`, { headers: this.headers });
  }
}
