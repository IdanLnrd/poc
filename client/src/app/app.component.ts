import { Component } from '@angular/core';
import { ApiService } from './api/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LNRD.io';
  loading = false;
  result: any = {};
  company: {[key: string]: { domain: string, name: string } } = {};
  constructor(private api: ApiService) {}
  

  search(nameEl: HTMLInputElement) {
    if(nameEl.value) {
      this.loading = true;
      const { domain, name } = this.company[nameEl.value] || { domain: 'nubela.co', name: 'Nubela' };
      const $result = this.api.getCompanyLinkedInUrl( { domain, name } );
      $result.toPromise()
      .then(data => { this.result = data })
      .catch(err => console.error(err))
      .finally(() => {
        this.loading = false;
      });
    }
    return false;
  }
}
