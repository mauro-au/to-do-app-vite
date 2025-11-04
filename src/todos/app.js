import html from './app.html?raw';
import todoStore, { Filter } from '../store/todo.store';
import { renderTodos, renderPending } from './use-cases';

const elementIDs = {
  TodoList: '.todo-list',
  NewTodoInput: '#new-todo-input',
  ClearCompletedButton: '.clear-completed',
  TodoFilters: '.filtro',
  PendingCountLabel: '#pending-count',
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
    updatePendingCount()
  }

  const updatePendingCount = () => {
    renderPending(elementIDs.PendingCountLabel)
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
  const clearCompletedButton = document.querySelector(elementIDs.ClearCompletedButton);
  const filtersLIs = document.querySelectorAll(elementIDs.TodoFilters);

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

  clearCompletedButton.addEventListener('click', () => {
    todoStore.deleteCompleted();
    displayTodos();
  })

  filtersLIs.forEach(element => {
    element.addEventListener('click', (element) => {
      filtersLIs.forEach(el => el.classList.remove('selected'));
      element.target.classList.add('selected');

      switch (element.target.text) {
        case 'Todos':
          todoStore.setFilter(Filter.All)
          break;
        case 'Pendientes':
          todoStore.setFilter(Filter.Pending)
          break;
        case 'Completados':
          todoStore.setFilter(Filter.Completed)
          break;
      }
      displayTodos();
    })
  })
}