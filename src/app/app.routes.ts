import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MisNegociosComponent } from './pages/mis-negocios/mis-negocios.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'mis-negocios', component: MisNegociosComponent },
    { path: '', component: LoginComponent },
    //{ path: '**', component: NopagefoundComponent },
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );