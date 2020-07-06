import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { MisNegociosComponent } from './mis-negocios/mis-negocios.component';
import { RegistrarNegocioComponent } from './registrar-negocio/registrar-negocio.component';
import { InformacionMiNegocioComponent } from './informacion-mi-negocio/informacion-mi-negocio.component';
import { EditarNegocioComponent } from './editar-negocio/editar-negocio.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [],
        children: [
            { path: 'mis-negocios', component: MisNegociosComponent , data: { titulo: 'Mis Negocios' } },
            { path: 'registrar-negocio', component: RegistrarNegocioComponent , data: { titulo: 'Registrar Negocio' } },
            { path: 'informacion-mi-negocio/:keyNegocio', component: InformacionMiNegocioComponent , data: { titulo: 'Información Mi Negocio' } },
            { path: 'editar-negocio/:keyNegocio', component: EditarNegocioComponent, data: { titulo: 'Modificar Negocio' } },
            { path: 'registrar-negocio', component: RegistrarNegocioComponent, data: { titulo: 'Registrar Negocio' } },
            { path: '', redirectTo: '/login', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );