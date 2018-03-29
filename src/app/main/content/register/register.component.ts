import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { AuthService } from '@fuse/services/auth.service';

import { locale as english } from './i18n/en';
import { locale as french } from './i18n/fr';

@Component({
    selector: 'fuse-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    animations: fuseAnimations,
})
export class FuseRegisterComponent implements OnInit {
    registerForm: FormGroup;
    registerFormErrors: any;

    constructor(
        private fuseConfig: FuseConfigService,
        private formBuilder: FormBuilder,
        private fuseTranslationLoader: FuseTranslationLoaderService,
        private authService: AuthService,
    ) {
        this.fuseTranslationLoader.loadTranslations(english, french);
        this.fuseConfig.setConfig({
            layout: {
                navigation: 'none',
                toolbar: 'none',
                footer: 'none',
            },
        });

        this.registerFormErrors = {
            firstname: {},
            lastname: {},
            email: {},
            password: {},
            passwordConfirm: {},
        };
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            passwordConfirm: ['', [Validators.required, confirmPassword]],
        });

        this.registerForm.valueChanges.subscribe(() => {
            this.onRegisterFormValuesChanged();
        });
    }

    onSubmit() {
        const { email, password, firstname, lastname } = this.registerForm.value;
        console.log('Submtin to auth service');
        this.authService.registerAndLogin(password, firstname, lastname, email);
    }

    onRegisterFormValuesChanged() {
        for (const field in this.registerFormErrors) {
            if (!this.registerFormErrors.hasOwnProperty(field)) {
                continue;
            }

            // Clear previous errors
            this.registerFormErrors[field] = {};

            // Get the control
            const control = this.registerForm.get(field);

            if (control && control.dirty && !control.valid) {
                this.registerFormErrors[field] = control.errors;
            }
        }
    }
}

function confirmPassword(control: AbstractControl) {
    if (!control.parent || !control) {
        return;
    }

    const password = control.parent.get('password');
    const passwordConfirm = control.parent.get('passwordConfirm');

    if (!password || !passwordConfirm) {
        return;
    }

    if (passwordConfirm.value === '') {
        return;
    }

    if (password.value !== passwordConfirm.value) {
        return {
            passwordsNotMatch: true,
        };
    }
}
