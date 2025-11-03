import html from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';

const elementIDs = {
  TodoList: '.todo-list',
  NewTodoInput: '#new-todo-input',
  DestroyTodo: '.destroy',
}
/**
 *
 * @param {String} elementId
 *
 */
export const App = (elementId) => {

  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(elementIDs.TodoList, todos)
  }


  //Cuando la función App( se llame)
  (() => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  // Referencias HTML
  const newDescriptionInput = document.querySelector(elementIDs.NewTodoInput);
  const todoListUL = document.querySelector(elementIDs.TodoList);
  const destroyTodo = document.querySelectorAll(elementIDs.DestroyTodo);

  // Listener
  newDescriptionInput.addEventListener('keyup', (event) => {
    if (event.keyCode !== 13) return;
    if (event.target.value.trim().length === 0) return;

    todoStore.addTodo(event.target.value);
    displayTodos();
    event.target.value = '';
  })

  todoListUL.addEventListener('click', (event) => {
    const element = event.target.closest('[data-id]');
    todoStore.toggleTodo(element.getAttribute('data-id'));
    displayTodos();
  })

  todoListUL.addEventListener('click', (event) => {
    const isDestroyElement = event.target.className === 'destroy'
    const element = event.target.closest('[data-id]');
    if (!isDestroyElement || !element) return

    todoStore.deleteTodo(element.getAttribute('data-id'));
    displayTodos();
  })
}