import { Component, Input, OnInit } from '@angular/core';
import {
    toggleDone,
    togglePriority,
    toggleArchive,
    createTodoItem,
    getTodoListById,
} from '../query';

import { Apollo } from 'apollo-angular';

@Component({
    selector: 'app-todo-list-item',
    templateUrl: './todo-list-item.component.html',
    styleUrls: ['./todo-list-item.component.scss'],
})
export class TodoListItemComponent implements OnInit {
    @Input() todo: any;
    @Input() listId: any;

    constructor(private apollo: Apollo) {}

    ngOnInit() {
        console.log(this.todo);
    }

    onDoneToggle() {
        console.log('called');
        this.runQuery(toggleDone);
    }

    onPriorityToggle() {
        console.log('called');
        this.runQuery(togglePriority);
    }

    onArchiveToggle() {
        console.log('called');
        this.runQuery(toggleArchive);
    }

    runQuery(query: any) {
        this.apollo
            .mutate({
                mutation: query,
                variables: {
                    id: this.todo.id,
                },
                refetchQueries: [
                    {
                        query: getTodoListById,
                        variables: { id: this.listId },
                    },
                ],
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
