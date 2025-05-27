import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { RESTCountry } from '../interfaces/rest-countries-interfaces';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CountryService {


  
  private http = inject(HttpClient);

  searchByCapital(query: string) : Observable<Country[]>{
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${url}/capital/${ query }`)
    .pipe(
      map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
      catchError((error) => {
        return throwError(
          () => new Error(`No se pudo obtener países con esa query ${query}`)
        )
      })
    )

  }

  searchByCountry(query: string) : Observable<Country[]>{
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${url}/name/${ query }`)
    .pipe(
      map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
      delay(3000),
      catchError((error) => {
        return throwError(
          () => new Error(`No se pudo obtener países con esa query ${query} ${error}`)
        )
      })
    )

  }

  searchCountryByAlphaCode(code: string) {
    code = code.toLowerCase();

    return this.http.get<RESTCountry[]>(`${url}/alpha/${ code }`)
    .pipe(
      map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
      map(countries => countries.at(0)),
      catchError((error) => {
        return throwError(
          () => new Error(`No se pudo obtener países con esa query ${code} ${error}`)
        )
      })
    )

  }





}
