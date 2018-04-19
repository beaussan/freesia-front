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

    formNameErrors: any;
    formEmailErrors: any;

    onglet1: FormGroup;
    onglet2: FormGroup;
    onglet3: FormGroup;
    horizontalStepperStep1Errors: any;

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
    }

    ngOnInit() {
        // Reactive Form
        this.formName = this.formBuilder.group({
            nom: ['', Validators.required],
            prenom: ['', Validators.required],
        });

        this.formName.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        // Horizontal Stepper form steps
        this.onglet1 = this.formBuilder.group({
            nom: ['', Validators.required],
            prenom: ['', Validators.required],
        });

        this.onglet1.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        // Horizontal Stepper form steps
        this.onglet2 = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });

        this.onglet2.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });

        this.onglet3.valueChanges.subscribe(() => {
            this.onFormValuesChanged();
        });
    }

    //PARTIE Formulaire Nom & Prénom
    onFormValuesChanged() {
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
    }

    onSubmit() {
        const { nom, prenom } = this.formName.value;
        console.log('Submtin to auth service');
    }
}
