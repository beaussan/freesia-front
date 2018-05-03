import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-todo-list-item',
    templateUrl: './todo-list-item.component.html',
    styleUrls: ['./todo-list-item.component.scss'],
})
export class TodoListItemComponent implements OnInit {
    @Input() todo: any;

    constructor() {}

    ngOnInit() {
        console.log(this.todo);
    }
}
