import { gql } from "@apollo/client";


export const ADD_TODO = gql`
mutation createTodo($createTodoInput: CreateTodoInput!){
    createTodo(createTodoInput: $createTodoInput){
    post
    description
    status
    createdAt
  }
}
`

export const DELETE_TODO = gql`
mutation RemoveTodo($id: String!) {
  removeTodo(remove: $id) {
    id
  }
}
`

export const UPDATE_TODO = gql`
mutation updateTodo($updateTodoInput: UpdateTodoInput!) {
  updateTodo(updateTodoInput: $updateTodoInput) {
    id
    post
    description
    status
  }
}


`