import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { createTodoItem, createTodoList, getAllTodoLists, getTodoListById } from './query';

@Component({
    selector: 'app-todolist',
    templateUrl: './todolist.component.html',
    styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent implements OnInit, OnDestroy {
    value = '';

    valueNewTodo = '';

    todoLists = [];

    selectedTodoList = undefined;

    private querySubscription: Subscription;
    private querySigngleTodoSubscription: Subscription;

    constructor(private apollo: Apollo, private activeRoute: ActivatedRoute) {
        this.activeRoute.paramMap.subscribe(params => {
            if (params.get('todolistId')) {
                if (this.querySigngleTodoSubscription) {
                    this.querySigngleTodoSubscription.unsubscribe();
                }

                this.querySigngleTodoSubscription = this.apollo
                    .watchQuery<any>({
                        query: getTodoListById,
                        variables: {
                            id: params.get('todolistId'),
                        },
                    })
                    .valueChanges.subscribe(({ data, loading }) => {
                        this.selectedTodoList = data.todoListById;
                    });
            } else {
                if (
                    this.querySigngleTodoSubscription &&
                    this.querySigngleTodoSubscription.unsubscribe
                ) {
                    this.querySigngleTodoSubscription.unsubscribe();
                }
                this.selectedTodoList = undefined;
            }
        });
    }

    ngOnInit() {
        this.querySubscription = this.apollo
            .watchQuery<any>({
                query: getAllTodoLists,
            })
            .valueChanges.subscribe(({ data, loading }) => {
                this.todoLists = data.allTodoList;
            });
    }

    ngOnDestroy() {
        this.querySubscription.unsubscribe();

        if (this.querySigngleTodoSubscription && this.querySigngleTodoSubscription.unsubscribe) {
            this.querySigngleTodoSubscription.unsubscribe();
        }
    }

    onCreateTodoItem() {
        this.apollo
            .mutate({
                mutation: createTodoItem,
                variables: {
                    text: this.valueNewTodo,
                    idList: this.selectedTodoList.id,
                },
                fetchPolicy: 'no-cache',
                refetchQueries: [
                    {
                        query: getTodoListById,
                        variables: { id: this.selectedTodoList.id },
                    },
                ],
            })
            .subscribe(
                ({ data }) => {
                    this.valueNewTodo = '';
                },
                error => {
                    console.log('there was an error sending the query', error);
                },
            );
    }

    onCreateTodoList() {
        this.apollo
            .mutate({
                mutation: createTodoList,
                variables: {
                    name: this.value,
                },
                fetchPolicy: 'no-cache',
                refetchQueries: [
                    {
                        query: getAllTodoLists,
                    },
                ],
            })
            .subscribe(
                () => {
                    this.value = '';
                },
                error => {
                    console.log('there was an error sending the query', error);
                },
            );
    }
}
