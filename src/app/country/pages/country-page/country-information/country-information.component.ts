import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Country } from 'src/app/country/interfaces/country.interface';

@Component({
  selector: 'app-country-information',
  imports: [DecimalPipe],
  templateUrl: './country-information.component.html',
  styleUrl: './country-information.component.css'
})
export class CountryInformationComponent { 
  country = input.required<Country>()
}
