import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

const updateUserInfo = gql`
    mutation updateUserInfo($firstname: String!, $lastname: String!) {
        updateUserInfo(firstname: $firstname, lastname: $lastname) {
            id
            firstName
            lastName
            email
        }
    }
`;

const updateEmail = gql`
    mutation updateEmail($password: String!, $email: String!) {
        updateEmail(password: $password, email: $email) {
            id
            firstName
            lastName
            email
        }
    }
`;

const updatePassword = gql`
    mutation updatePassword($oldPassword: String!, $newPassword: String!) {
        updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
            id
            firstName
            lastName
            email
        }
    }
`;

@Injectable()
export class UserEditService {
    constructor(private apollo: Apollo) {}

    modifName(firstname: string, lastname: string) {
        this.apollo
            .mutate({
                mutation: updateUserInfo,
                variables: {
                    firstname,
                    lastname,
                },
            })
            .subscribe(
                ({ data }) => {
                    console.log(data);
                },
                error => {
                    console.log('there was an error sending the query', error);
                },
            );
    }

    modifEmail(email: string, password: string) {
        this.apollo
            .mutate({
                mutation: updateEmail,
                variables: {
                    email,
                    password,
                },
            })
            .subscribe(
                ({ data }) => {
                    console.log(data);
                },
                error => {
                    console.log('there was an error sending the query', error);
                },
            );
    }

    modifPassword(oldPassword: string, newPassword: string) {
        this.apollo
            .mutate({
                mutation: updatePassword,
                variables: {
                    oldPassword,
                    newPassword,
                },
            })
            .subscribe(
                ({ data }) => {
                    console.log(data);
                },
                error => {
                    console.log('there was an error sending the query', error);
                },
            );
    }
}
