import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material';

const loginRequrest = gql`
    mutation loginRequrest($email: String!, $password: String!) {
        getToken(email: $email, password: $password) {
            access_token
            refresh_token
            expires_in
            user {
                id
                firstName
                lastName
                email
            }
        }
    }
`;

const registerMutation = gql`
    mutation registerUser(
        $email: String!
        $password: String!
        $fristname: String!
        $lastname: String!
    ) {
        register(
            newUser: {
                password: $password
                firstName: $fristname
                lastName: $lastname
                email: $email
            }
        ) {
            id
            firstName
            lastName
            email
        }
    }
`;

@Injectable()
export class AuthService {
    constructor(
        private apollo: Apollo,
        private snackBar: MatSnackBar,
        private translate: TranslateService,
    ) {}

    private user: any;

    login(email: string, password: string) {
        console.log('Loggin in for ', email, password);

        this.apollo
            .mutate({
                mutation: loginRequrest,
                variables: {
                    email,
                    password,
                },
                fetchPolicy: 'no-cache',
            })
            .subscribe(
                ({ data }) => {
                    this.gotToken(data);
                },
                error => {
                    console.log('there was an error sending the query', error);
                    this.makeToastWithMessage('TOASTS.LOGIN_ERROR');
                },
            );
    }

    disconect() {
        localStorage.removeItem('token');
        this.user = undefined;
    }

    registerAndLogin(password, fristname, lastname, email) {
        console.log('Loggin in for ', email, password);

        this.apollo
            .mutate({
                mutation: registerMutation,
                variables: {
                    email,
                    password,
                    fristname,
                    lastname,
                },
                fetchPolicy: 'no-cache',
            })
            .subscribe(
                ({ data }) => {
                    this.login(email, password);
                },
                error => {
                    console.log('there was an error sending the query', error);
                    this.makeToastWithMessage('TOASTS.REGISTER_ERROR');
                },
            );
    }

    private gotToken({ getToken }) {
        localStorage.setItem('token', getToken.access_token);
        console.log('Got data ! ', getToken);
        this.user = getToken.user;
    }

    private makeToastWithMessage(key: string) {
        this.translate.get(key).subscribe((res: string) => {
            this.snackBar.open(res, undefined, {
                duration: 2000,
            });
        });
    }
}
