import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Apollo, ApolloModule } from 'apollo-angular';
import { HttpLink, HttpLinkModule } from 'apollo-angular-link-http';

import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { TranslateModule } from '@ngx-translate/core';

import { FlexLayoutModule } from '@angular/flex-layout';

import { FuseDirectivesModule } from '@fuse/directives/directives';
import { FusePipesModule } from '@fuse/pipes/pipes.module';

import { environment } from '../environments/environment';

import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from './services/auth.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,

        TranslateModule,

        FuseDirectivesModule,
        FusePipesModule,

        MatSnackBarModule,

        HttpClientModule, // provides HttpClient for HttpLink
        ApolloModule,
        HttpLinkModule,
    ],
    providers: [AuthService],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,

        FlexLayoutModule,
        TranslateModule,

        FuseDirectivesModule,
        FusePipesModule,

        HttpClientModule, // provides HttpClient for HttpLink
        ApolloModule,
        HttpLinkModule,
    ],
})
export class FuseSharedModule {
    constructor(apollo: Apollo, httpLink: HttpLink) {
        const http = httpLink.create({ uri: environment.graphqlUrl });

        const auth = setContext((_, { headers }) => {
            // get the authentication token from local storage if it exists
            const token = localStorage.getItem('token');
            // return the headers to the context so httpLink can read them
            // in this example we assume headers property exists
            // and it is an instance of HttpHeaders
            if (!token) {
                return {};
            } else {
                return {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };
            }
        });

        const completeLink = auth.concat(http);

        apollo.create({
            link: completeLink,
            cache: new InMemoryCache(),
        });
    }
}
