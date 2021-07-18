import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ApiService } from './api/api.service';
import { DatasetService } from './data/dataset.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'LNRD.io';
  loading = false;
  result: any = {};
  companiesNames: string[] = [];
  companies: any[] = [];
  constructor(private api: ApiService, private dataset: DatasetService) {}
  
  ngOnInit() : void {
    this.dataset.companies().then(c => {
      this.companies = c;
      this.companiesNames = this.companies.filter(c => !!c.name).map(c => c.name);
    });
  }

  similarSelected(similar: any) {
    console.log(similar);
  }

  optionSelected(data: any) {
    console.log('optionSelected: ', data.option.value);

  }

  async search(formControl: FormControl) {
    const name = formControl.value;
    const companyData = this.companies.find(c => c.name.toLowerCase() === name.toLowerCase());
    const lu = companyData['linkedin url'];
    if(!lu) {
      alert('no linkedin url!');
      return console.error('no linkedin url');
    }
    
    const linkedInUrl = `https://www.${lu}/`;

    try {
      formControl.disable();
      this.loading = true;
      const result = await this.api.getCompanyLinkedInProfile({ linkedInUrl }).toPromise();
      const { company } = result.data;
      const c = JSON.parse(company || null);
      if(c) {
        const mergedData = Object.assign(companyData, c);
        console.log();
        const {
          domain,
          website,
          name,
          description,
          profile_pic_url,
          company_type,
          locations,
          funding_data,
          founded_year,
          hq
       } = mergedData;
       
      this.result = mergedData;
       console.log('result:', this.result);
      }
    } catch(e) {
      console.error(e);
    } finally {
      this.loading = false;
      formControl.enable();
    }
  
  }
}
