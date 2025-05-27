import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
  styleUrl: './country-search-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchInputComponent { 

  value = output<string>();

  placeholder = input()

}
