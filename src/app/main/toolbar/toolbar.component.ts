import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../../../@fuse/services/auth.service';

const CurrentUserForProfile = gql`
    query CurrentUserForProfile {
        getMe {
            lastName
            firstName
            id
        }
    }
`;

@Component({
    selector: 'fuse-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
})
export class FuseToolbarComponent implements OnInit, OnDestroy {
    userStatusOptions: any[];
    languages: any;
    selectedLanguage: any;
    showLoadingBar: boolean;
    horizontalNav: boolean;
    noNav: boolean;

    loading: boolean;
    currentUser: any;

    private querySubscription: Subscription;

    constructor(
        private router: Router,
        private fuseConfig: FuseConfigService,
        private sidebarService: FuseSidebarService,
        private translate: TranslateService,
        private apollo: Apollo,
        private auth: AuthService,
    ) {
        this.userStatusOptions = [
            {
                title: 'Online',
                icon: 'icon-checkbox-marked-circle',
                color: '#4CAF50',
            },
            {
                title: 'Away',
                icon: 'icon-clock',
                color: '#FFC107',
            },
            {
                title: 'Do not Disturb',
                icon: 'icon-minus-circle',
                color: '#F44336',
            },
            {
                title: 'Invisible',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#BDBDBD',
            },
            {
                title: 'Offline',
                icon: 'icon-checkbox-blank-circle-outline',
                color: '#616161',
            },
        ];

        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us',
            },
            {
                id: 'fr',
                title: 'French',
                flag: 'fr',
            },
        ];

        this.selectedLanguage = this.languages[0];

        router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.showLoadingBar = true;
            }
            if (event instanceof NavigationEnd) {
                this.showLoadingBar = false;
            }
        });

        this.fuseConfig.onConfigChanged.subscribe(settings => {
            this.horizontalNav = settings.layout.navigation === 'top';
            this.noNav = settings.layout.navigation === 'none';
        });
    }

    ngOnInit() {
        this.querySubscription = this.apollo
            .watchQuery<any>({
                query: CurrentUserForProfile,
            })
            .valueChanges.subscribe(({ data, loading }) => {
                this.loading = loading;
                this.currentUser = data.getMe;
                console.log(data, loading);
            });
    }

    ngOnDestroy() {
        this.querySubscription.unsubscribe();
    }

    toggleSidebarOpened(key) {
        this.sidebarService.getSidebar(key).toggleOpen();
    }

    search(value) {
        // Do your search here...
        console.log(value);
    }

    disconect() {
        this.auth.disconect();
    }

    setLanguage(lang) {
        // Set the selected language for toolbar
        this.selectedLanguage = lang;

        // Use the selected language for translations
        this.translate.use(lang.id);
    }
}
