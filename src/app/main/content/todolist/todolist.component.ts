import { Component, OnInit, OnDestroy } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Subscription } from 'rxjs/Subscription';

const createTodoList = gql`
    mutation createTodoList($name: String!) {
        createTodoList(name: $name) {
            title
            id
            todoItems {
                id
                text
                isDone
                isArchived
                isHighPriority
            }
        }
    }
`;

const getAllTodoLists = gql`
    query fetchTodoLists {
        allTodoList {
            title
            id
            todoItems {
                id
                text
                isDone
                isArchived
                isHighPriority
            }
        }
    }
`;

@Component({
    selector: 'app-todolist',
    templateUrl: './todolist.component.html',
    styleUrls: ['./todolist.component.scss'],
})
export class TodolistComponent implements OnInit, OnDestroy {
    value = '';

    todoLists = [];

    private querySubscription: Subscription;

    constructor(private apollo: Apollo) {}

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
    }

    fetchTodoLists() {}

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
                ({ data }) => {
                    console.log(data);
                    this.value = '';
                },
                error => {
                    console.log('there was an error sending the query', error);
                },
            );
    }
}
