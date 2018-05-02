import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseSharedModule } from '@fuse/shared.module';
import { RouterModule } from '@angular/router';
import { TodolistComponent } from './todolist.component';
import { TodoListItemComponent } from './todo-list-item/todo-list-item.component';
import {
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
} from '@angular/material';

const routes = [
    {
        path: 'todolists',
        component: TodolistComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        CommonModule,

        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
    ],
    declarations: [TodolistComponent, TodoListItemComponent],
})
export class TodolistModule {}
