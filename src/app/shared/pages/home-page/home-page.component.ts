import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home-page',
  imports: [RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent { }
