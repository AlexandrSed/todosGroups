import { addIcon, backIcon, doneIcon, downloadIcon, editIcon, showIcon, progressIcon, removeIcon, hideIcon, homeIcon } from "./icons.js";
import { getTodoGroups } from './data.js';
import { fragment } from "./helpers.js";
import { handleAddTodo, handleAddTodoGroup, handleEditTodoGroup } from './form-handlers.js';
import { removeAllGroups, actionWithGroup, goToGroupList, actionWithTodo } from "./event.js";

export function renderNotFound() {
  return fragment/*html*/`
    <h1 class="title">PAGE NOT FOUND</h1>
  `;
}

export function renderTodoGroups() {
  const groups = getTodoGroups();
  const page = fragment/*html*/`
    <div class="TodoList">
      <div class="header">
        <h1 class="title">Todos group list</h1>
        <form id="addGroupForm">
          <label>Add new group</label>
          <input class="input" type="text" placeholder="Add group title" name="title" ${validation('title')}>
          <label>Add description</label>
          <input class="input" type="text" placeholder="Add description" name="description" ${validation('description')}>
          <button class="button buttonPrimary create-form_add-button" type="submit">
            ${addIcon()}
            Add
          </button>
        </form>
      </div>
      <div class="groups__list list">
        ${
          groups.length === 0
          ? /*html*/`<h5 id="noGroups" class="no-entries">No entries yet. Add new one using the form above.</h5>`
          : getTodoGroupsTemplate(groups)}
      </div>
      <div class="removeAll">
        <button id="removeAllGroups" class="button buttonDanger" onclick="">
          ${removeIcon()}
          Remove all
        </button>
      </div>
    </div>
  `;
  const applicantForm = page.getElementById('addGroupForm');
  applicantForm.addEventListener('submit', handleAddTodoGroup);

  const removeAllBtn = page.getElementById('removeAllGroups');
  removeAllBtn.addEventListener("click", removeAllGroups);

  const groupsList = page.querySelector(".groups__list");
  groupsList.addEventListener("click", actionWithGroup);
  return page;
}

export function getTodoGroupsTemplate(groups) {
  return groups.map(group => {
    return /*html*/`
      <div id=${group.id} class="listItem" data-id="">
        <div class="itemLink">
          <h3 class="itemTitle">
            ${group.title}
          </h3>
          <div class="itemDescription">${group.description}</div>
        </div>
        <div class="itemButtons">
          <button id=${'editBtn' + group.id} class="button buttonPrimary" onclick="">
            ${editIcon()}
            Edit
          </button>
          <button id=${'removeBtn' + group.id} class="removeGroup button buttonDanger" onclick="">
            ${removeIcon()}
            Remove
          </button>
        </div>
    </div>
    `;
  }).join("");
}

export function renderEditTodoGroup(group) {
  const page = fragment/*html*/`
  <div class="TodoList">
    <div class="header">
      <h1 class="title">Edit group #${group.id}</h1>
      <form id="editGroupForm">
        <input class="input" type="hidden" value="${group.id}" name="id">
        <label>Input new title</label>
        <input class="input" type="text" value="${group.title}" placeholder="group title" name="title" ${validation('title')}>
        <label>Input new description</label>
        <input class="input" type="text" value="${group.description}" placeholder="description" name="description" ${validation('description')}>
        <button class="button buttonPrimary" type="submit">
          ${editIcon()}
          Edit
        </button>
      </form>
      <button id="backBtn" class="button buttonPrimary">
          ${backIcon()}
          Back
        </button>
    </div>
  </div>
  `;

  const applicantForm = page.getElementById('editGroupForm');
  applicantForm.addEventListener('submit', handleEditTodoGroup);

  const backBtn = page.getElementById('backBtn');
  backBtn.addEventListener("click", goToGroupList);

  return page;
}

export function renderTodos(group) {
  const page = fragment/*html*/`
    <div class="TodoList">
      <div class="header">
        <h1 class="title">Todos group ${group.title}</h1>
        <h2 class="description">${group.description}</h2>
        <form id="addTodoForm">
          <input type="hidden" name="groupID" value=${group.id}>
          <label>Add new Todo</label>
          <input class="input" type="text" placeholder="Add todo" name="title" ${validation('title')}>
          <button class="button buttonPrimary create-form_add-button" type="submit">
            ${addIcon()}
            Add
          </button>
        </form>
        <button id="backBtn" class="button buttonPrimary">
          ${backIcon()}
          Back
        </button>
      </div>
      <div class="todos__list list">
        ${
          group.todos.length === 0
          ? /*html*/`<h5 id="noTodos" class="no-entries">No entries yet. Add new one using the form above.</h5>`
          : getTodosTemplate(group.todos)}
      </div>
    </div>
  `;
  const applicantForm = page.getElementById('addTodoForm');
  applicantForm.addEventListener('submit', handleAddTodo);

  const todosList = page.querySelector(".todos__list");
  todosList.addEventListener("click", actionWithTodo);

  const backBtn = page.getElementById('backBtn');
  backBtn.addEventListener("click", goToGroupList);
  return page;
}

export function getTodosTemplate(todos) {
  return todos.map(todo => {
    return /*html*/`
      <div id=${todo.id} class="listItem" data-id="">
        <div class="">
            <h3 class="itemTitle">
              ${todo.title}
            </h3>
            <div id=${'status' + todo.id} class="progress">${todo.status}</div>
        </div>
        <div class="itemButtons">
          <button hidden id=${'removeBtn' + todo.id} class="removeGroup button buttonDanger" onclick="">
            ${removeIcon()}
            Remove
          </button>
        </div>
    </div>
    `;
  }).join("");
}

function validation(name) {
  return `
    required 
    oninvalid="this.setCustomValidity('Please enter a valid ${name}');this.parentElement.classList.add('input_error')"
    oninput="this.setCustomValidity('');this.parentElement.classList.remove('input_error')"
  `;
}