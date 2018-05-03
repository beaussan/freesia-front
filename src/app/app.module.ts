import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { fuseConfig } from './fuse-config';

import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { FuseSampleModule } from './main/content/sample/sample.module';
import { LoginModule } from './main/content/login/login.module';
import { RegisterModule } from './main/content/register/register.module';
import { UserEditModule } from './main/content/user-edit/user-edit.module';
import { TodolistComponent } from './main/content/todolist/todolist.component';
import { TodolistModule } from './main/content/todolist/todolist.module';

const appRoutes: Routes = [
    {
        path: '**',
        redirectTo: 'login',
    },
];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes),
        TranslateModule.forRoot(),

        // Fuse Main and Shared modules
        FuseModule.forRoot(fuseConfig),
        FuseSharedModule,
        FuseMainModule,
        FuseSampleModule,
        LoginModule,
        RegisterModule,
        UserEditModule,
        TodolistModule,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
