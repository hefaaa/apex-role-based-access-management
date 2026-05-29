import { NgModule } from '@angular/core';

import { BrowserModule }
from '@angular/platform-browser';

import { FormsModule }
from '@angular/forms';

import { HttpClientModule }
from '@angular/common/http';

import { AppRoutingModule }
from './app-routing.module';

import { App }
from './app';

import { Login }
from './pages/login/login';

import { Dashboard }
from './pages/dashboard/dashboard';

import { Admin }
from './pages/admin/admin';


@NgModule({

  declarations: [

    App

  ],

  imports: [

    BrowserModule,

    AppRoutingModule,

    FormsModule,

    HttpClientModule,

    Login,

    Dashboard,

    Admin

  ],

  providers: [],

  bootstrap: [App]

})

export class AppModule {}