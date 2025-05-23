import { Routes } from '@angular/router' 
import { ByCapitalComponent } from './pages/by-capital/by-capital.component'
import { CountryLayoutComponent } from './country-layout/country-layout/country-layout.component';
import { ByCountryComponent } from './pages/by-country/by-country.component';

export const countryRoutes: Routes = [

    {
        path: '',
        component: CountryLayoutComponent,
        children: [
            {
                path : 'by-capital',
                component: ByCapitalComponent
            },
            {
                path: 'by-country',
                component: ByCountryComponent
            },
            {
                path: '**',
                redirectTo: 'by-capital'
            }
        ]
    }

]

export default countryRoutes;