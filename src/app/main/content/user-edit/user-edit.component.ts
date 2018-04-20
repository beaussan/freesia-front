import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuseConfigService } from '../../../../@fuse/services/config.service';
import { locale as english } from './i18n/en';
import { locale as french } from './i18n/fr';
import { FuseTranslationLoaderService } from '../../../../@fuse/services/translation-loader.service';
import { UserEditService } from './user-edit.service';

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
        private userEditService: UserEditService,
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
            oldPassword: ['', Validators.required],
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
        const { firstName, lastName } = this.formName.value;
        this.userEditService.modifName(firstName, lastName);
        console.log('Edit submit Name');
    }

    editEmailSubmit() {
        const { email, password } = this.formEmail.value;
        this.userEditService.modifEmail(email, password);
        console.log('Edit submit Email');
    }

    editPasswordSubmit() {
        const { oldPassword, newPassword } = this.formPassword.value;
        this.userEditService.modifPassword(oldPassword, newPassword);
        console.log('Edit submit Password');
    }
}
