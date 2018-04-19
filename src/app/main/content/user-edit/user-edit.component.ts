import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../@fuse/services/config.service';
import { locale as english } from './i18n/en';
import { locale as french } from './i18n/fr';
import { FuseTranslationLoaderService } from '../../../../@fuse/services/translation-loader.service';

@Component({
    selector: 'fuse-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
    formName: FormGroup; //Formulaire par Nom & Prénom
    formEmail: FormGroup; //Formulaire par Email
    formPassword: FormGroup; // Formulaire par Password
    formNameErrors: any;
    formEmailErrors: any;
    formPasswordErrors: any;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private fuseTranslationLoader: FuseTranslationLoaderService,
    ) {
        this.fuseTranslationLoader.loadTranslations(english, french);

        this.formNameErrors = {
            nom: {},
            prenom: {},
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
            nom: ['', Validators.required],
            prenom: ['', Validators.required],
        });

        this.formName.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.formEmail = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });

        this.formEmail.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.formPassword = this.formBuilder.group({
            lastPassword: ['', Validators.required],
            newPassword: ['', Validators.required],
            passwordConfirm: ['', Validators.required],
        });

        this.formPassword.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
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

    editNameSubmit() {
        const { nom, prenom } = this.formName.value;
        console.log('Submtin to auth service');
    }

    editEmailSubmit() {
        const { email, password } = this.formEmail.value;
        console.log('Submtin to auth service');
    }

    editPasswordSubmit() {
        const { oldPassword, newPassword, passwordConfirm } = this.formEmail.value;
        console.log('Submtin to auth service');
    }
}
