import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-by-country',
  imports: [],
  templateUrl: './by-country.component.html',
  styleUrl: './by-country.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryComponent { }
