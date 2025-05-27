import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { catchError, delay, map, Observable, of, tap, throwError } from 'rxjs';
import { RESTCountry } from '../interfaces/rest-countries-interfaces';
import { Country } from '../interfaces/country.interface';
import { CountryMapper } from '../mappers/country.mapper';

const url = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>
  private queryCacheCountry = new Map<string, Country[]>
  private queryCacheRegion = new Map<string, Country[]>


  searchByCapital(query: string) : Observable<Country[]>{
    query = query.toLowerCase();

    if(this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query)?? [])
    }

    return this.http.get<RESTCountry[]>(`${url}/capital/${ query }`)
    .pipe(
      map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
      tap( countries => this.queryCacheCapital.set(query,countries)),
      catchError((error) => {
        return throwError(
          () => new Error(`No se pudo obtener países con esa query ${query}`)
        )
      })
    )

  }

  searchByCountry(query: string) : Observable<Country[]>{
    query = query.toLowerCase();

    if(this.queryCacheCapital.has(query)){
      return of(this.queryCacheCapital.get(query) ?? [])
    }

    return this.http.get<RESTCountry[]>(`${url}/name/${ query }`)
    .pipe(
      map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
      tap(countries => this.queryCacheCountry.set(query, countries)),
      delay(3000),
      catchError((error) => {
        return throwError(
          () => new Error(`No se pudo obtener países con esa query ${query} ${error}`)
        )
      })
    )
  }

  searchByRegion(query: string) : Observable<Country[]>{
    query = query.toLowerCase()

    if(this.queryCacheRegion.has(query)){
      return of(this.queryCacheRegion.get(query) ?? [])
    }
    

    return this.http.get<RESTCountry[]>(`${url}/region/${query}`)
      .pipe(
        map( restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
        tap( countries => this.queryCacheRegion.set(query, countries) ),
        catchError((error) => {
          console.log(error)
          return throwError (
            
            () => new Error(`No se pudo obtener los datos`)
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
