import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';
import { AgmCoreModule  } from '@agm/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { WavesModule, TableModule, InputsModule } from 'ng-uikit-pro-standard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';
import { MisNegociosComponent } from './mis-negocios/mis-negocios.component';
import { NavComponent } from './nav/nav.component';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { DropzoneDirective } from './dropzone.directive';
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
    declarations: [
        PagesComponent,
        MisNegociosComponent,
        NavComponent,
        DropzoneDirective
    ],
    exports: [
        MisNegociosComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        PAGES_ROUTES,
        WavesModule,
        TableModule,
        InputsModule,
        MDBBootstrapModulesPro.forRoot(),
        AgmCoreModule.forRoot({
            // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en#key
        }),
        NgxDropzoneModule,
        SlickCarouselModule,
        AngularEditorModule
    ],
    providers: [
    ],
    schemas: [ NO_ERRORS_SCHEMA ]
})
export class PagesModule { }