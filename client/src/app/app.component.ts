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
  constructor(private api: ApiService) {}
  
  search(websiteEl: HTMLInputElement, nameEl: HTMLInputElement) {
    if(websiteEl.value && nameEl.value) {
      this.loading = true;
      const domain = websiteEl.value;
      const name = nameEl.value;
      const $result = this.api.getCompanyLinkedInUrl( { domain, name } );
      $result.toPromise()
      .then(data => this.result = data)
      .catch(console.error)
      .finally(() => {
        this.loading = false;
      });
    }
    return false;
  }
}
