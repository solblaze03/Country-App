import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  linkedSignal,
  output,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-country-search-input',
  imports: [],
  templateUrl: './country-search-input.component.html',
  styleUrl: './country-search-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountrySearchInputComponent {
  value = output<string>();

  placeholder = input();

 

  initialValue = input<string>('')

  inputValue = linkedSignal<string>( () =>   this.initialValue())

  debounceEffect = effect((onCleanup) => {
    const value = this.inputValue();
    const timeout = setTimeout(() => {
      this.value.emit(value);
    }, 900);

    onCleanup(() => {
      clearTimeout(timeout)
    })

    
  });
}
