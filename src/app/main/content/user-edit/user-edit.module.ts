import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditComponent } from './user-edit.component';
import { FuseSharedModule } from '@fuse/shared.module';
import {
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { UserEditService } from './user-edit.service';

const routes = [
    {
        path: 'user-edit',
        component: UserEditComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FuseSharedModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
    ],
    providers: [UserEditService],
    declarations: [UserEditComponent],
})
export class UserEditModule {}
