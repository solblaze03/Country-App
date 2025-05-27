import { Location } from '@angular/common';
import { Component, inject, input } from '@angular/core';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {
  message = input.required<string>()
  location = inject(Location)

  goBack(){
    this.location.back()
  }
}
