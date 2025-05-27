import { ChangeDetectionStrategy, Component, inject, input, resource, signal } from '@angular/core';
import { CountryListComponent } from '../../components/country-list/country-list.component';
import { CountrySearchInputComponent } from '../../components/country-search-input/country-search-input.component';
import { of } from 'rxjs';
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-country',
  imports: [CountrySearchInputComponent, CountryListComponent],
  templateUrl: './by-country.component.html',
  styleUrl: './by-country.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ByCountryComponent {

  countryService = inject(CountryService)
  
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''
  query = signal(this.queryParam) 

 countryResource = rxResource({
    request: () => ({query : this.query() }),
    loader : ({ request }) => {
      if( !request.query ) return of([])
        this.router.navigate(['/country/by-country'], {
          queryParams: {
            query : request.query
          }
        })
      return this.countryService.searchByCountry(request.query)
      
    }
  })
 }
