import { ChangeDetectionStrategy, Component, inject, input, resource, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { firstValueFrom, of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-by-country',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country.component.html',
  styleUrl: './by-country.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ByCountryComponent {

  query = signal('') 

 

  countryService = inject(CountryService)

 countryResource = rxResource({
    request: () => ({query : this.query() }),
    loader : ({ request }) => {
      if( !request.query ) return of([])

      return this.countryService.searchByCountry(request.query)
      
    }
  })

  

 }
