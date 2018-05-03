import gql from 'graphql-tag';

export const createTodoList = gql`
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

export const createTodoItem = gql`
    mutation createTotoItem($idList: Int!, $text: String!) {
        addTodoItem(listId: $idList, message: $text) {
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

export const getAllTodoLists = gql`
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

export const getTodoListById = gql`
    query getTodoListById($id: Int!) {
        todoListById(id: $id) {
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
