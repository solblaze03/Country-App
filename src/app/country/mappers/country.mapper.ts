import { Country } from '../interfaces/country.interface';
import { RESTCountry } from '../interfaces/rest-countries-interfaces';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations["spa"].common,
      capital: restCountry.capital?.join(','),
      population: restCountry.population,
    };
  }

    static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]) : Country[] {
        return restCountries.map((country) =>  this.mapRestCountryToCountry(country))
    }

    


}

