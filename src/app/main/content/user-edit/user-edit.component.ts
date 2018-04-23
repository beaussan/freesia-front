import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../@fuse/services/config.service';
import { locale as english } from './i18n/en';
import { locale as french } from './i18n/fr';
import { FuseTranslationLoaderService } from '../../../../@fuse/services/translation-loader.service';
import { UserEditService } from './user-edit.service';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs/Subscription';
import { Apollo } from 'apollo-angular';

const CurrentUserForProfile = gql`
    query CurrentUserForProfile {
        getMe {
            lastName
            firstName
            email
            id
        }
    }
`;

@Component({
    selector: 'fuse-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit, OnDestroy {
    formName: FormGroup; //Formulaire par Nom & Prénom
    formEmail: FormGroup; //Formulaire par Email
    formPassword: FormGroup; // Formulaire par Password
    formNameErrors: any;
    formEmailErrors: any;
    formPasswordErrors: any;
    loading: boolean;
    currentUser: any;

    private querySubscription: Subscription;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private fuseTranslationLoader: FuseTranslationLoaderService,
        private userEditService: UserEditService,
        private apollo: Apollo,
    ) {
        this.fuseTranslationLoader.loadTranslations(english, french);

        this.formNameErrors = {
            firstName: {},
            lastName: {},
        };
        this.formEmailErrors = {
            email: {},
            password: {},
        };
        this.formPasswordErrors = {
            oldPassword: {},
            newPassword: {},
            passwordConfirm: {},
        };
    }

    ngOnInit() {
        this.formName = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
        });

        this.formEmail = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });

        this.formPassword = this.formBuilder.group({
            oldPassword: ['', Validators.required],
            newPassword: ['', Validators.required],
            passwordConfirm: ['', Validators.required],
        });

        //Récupération du nom et du prénom pour le remplissage auto
        this.querySubscription = this.apollo
            .watchQuery<any>({
                query: CurrentUserForProfile,
            })
            .valueChanges.subscribe(({ data, loading }) => {
                this.loading = loading;
                this.currentUser = data.getMe;
                console.log(data, loading);

                if (this.currentUser) {
                    this.formName = this.formBuilder.group({
                        firstName: [this.currentUser.firstName, Validators.required],
                        lastName: [this.currentUser.lastName, Validators.required],
                    });
                    this.formEmail = this.formBuilder.group({
                        email: [this.currentUser.email, Validators.required],
                    });
                }
            });

        this.formName.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.formEmail.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.formPassword.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
    }

    ngOnDestroy() {
        this.querySubscription.unsubscribe();
    }

    onFormValuesChanged() {
        //PARTIE Formulaire Nom & Prénom
        for (const field in this.formNameErrors) {
            if (!this.formNameErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.formNameErrors[field] = {};

            // Get the control
            const control = this.formName.get(field);

            if (control && control.dirty && !control.valid) {
                this.formNameErrors[field] = control.errors;
            }
        }

        //PARTIE Formulaire Email & Password
        for (const field in this.formEmailErrors) {
            if (!this.formEmailErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.formEmailErrors[field] = {};

            // Get the control
            const control = this.formEmail.get(field);

            if (control && control.dirty && !control.valid) {
                this.formEmailErrors[field] = control.errors;
            }
        }

        //PARTIE Formulaire Password
        for (const field in this.formPasswordErrors) {
            if (!this.formPasswordErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.formPasswordErrors[field] = {};

            // Get the control
            const control = this.formEmail.get(field);

            if (control && control.dirty && !control.valid) {
                this.formPasswordErrors[field] = control.errors;
            }
        }
    }

    //Différents submit pour chaque formulaire
    editNameSubmit() {
        const { firstName, lastName } = this.formName.value;
        this.userEditService.modifName(firstName, lastName);
        console.log('Edit submit Name');
    }

    editEmailSubmit() {
        const { email, password } = this.formEmail.value;
        this.userEditService.modifEmail(email, password);
        console.log('Edit submit Email');

        this.formEmail = this.formBuilder.group({
            email: [this.currentUser.email, Validators.required],
            password: ['', Validators.required],
        });
    }

    editPasswordSubmit() {
        const { oldPassword, newPassword } = this.formPassword.value;
        this.userEditService.modifPassword(oldPassword, newPassword);
        console.log('Edit submit Password');

        this.formPassword = this.formBuilder.group({
            oldPassword: ['', Validators.required],
            newPassword: ['', Validators.required],
            passwordConfirm: ['', Validators.required],
        });
    }
}
