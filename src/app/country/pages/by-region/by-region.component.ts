import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Region } from './model/Region';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { CountryService } from '../../services/country.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-region',
  imports: [CountryListComponent],
  templateUrl: './by-region.component.html',
  styleUrl: './by-region.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionComponent {


  countryService = inject(CountryService)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)
  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''
  regionSelected  = signal<string>(this.queryParam)
  
  countryResource = rxResource({
    request: () => ({query: this.regionSelected() }),
    loader: ({ request }) => {
      if( !request.query ) return of([])
        this.router.navigate(['country/by-region'], {
          queryParams:{
            query: request.query
          } 
        })
        return this.countryService.searchByRegion(request.query)
    }

  })

  

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

 }
