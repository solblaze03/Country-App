import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-by-capital',
  imports: [],
  templateUrl: './by-capital.component.html',
  styleUrl: './by-capital.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCapitalComponent { 

  onSearch(value : string ){
    console.log(value)
  }

}
