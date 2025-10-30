import { Todo } from '../todos/models/todo.models';

const Filter = {
  All: 'all',
  Completed: 'Completed',
  Pending: 'Pending'
}

const state = {
  todos: [
    new Todo('Piedra del alma'),
    new Todo('Piedra del infinito'),
    new Todo('Piedra del tiempo'),
  ],
  filter: Filter.All,
}

const initStore = () => {
  console.log('InitStore ')
}