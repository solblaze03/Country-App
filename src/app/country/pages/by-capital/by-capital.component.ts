import {  Component, inject, resource,signal } from '@angular/core';
import { CountrySearchInputComponent } from "../../components/country-search-input/country-search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { __asyncValues } from 'tslib';
import { of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop'



@Component({
  selector: 'app-by-capital',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-capital.component.html',
  styleUrl: './by-capital.component.css'
})
export class ByCapitalComponent { 

  countryService = inject(CountryService) 

  query = signal('')

  countryResource = rxResource({
    request: () => ({query : this.query() }),
    loader : ({ request }) => {
      if( !request.query ) return of([])

      return this.countryService.searchByCapital(request.query)
      
    }
  })

  

  // isLoading = signal(false)
  // isError = signal<string | null>(null)
  
  // countries = signal<Country[]>([])

  // onSearch(query : string ){
    
  //   if( this.isLoading() ) return;

  //   this.isLoading.set(true)
  //   this.isError.set(null)

  //   this.countryService.searchByCapital(query).subscribe( {
  //     next: (result) => {

  //       this.isLoading.set(false)
  //       this.countries.set(result)

  //     },
  //     error: (err)=>{
  //       this.isLoading.set(false)
  //       this.countries.set([])
  //       this.isError.set(err)
  //     }
    
  //   })

  // }

}
