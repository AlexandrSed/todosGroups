import { addIcon, backIcon, doneIcon, downloadIcon, editIcon, showIcon, progressIcon, removeIcon, hideIcon, homeIcon } from "./icons.js";
import { getTodoGroups } from './data.js';
import { fragment } from "./helpers.js";
import { handleAddTodoGroup } from './form-handlers.js';
import { removeAllGroups, actionWithGroup } from "./event.js";

export function renderNotFound() {
  return fragment/*html*/`
    <h1 class="title">PAGE NOT FOUND</h1>
  `;
}

export function renderTodoList() {
  const groups = getTodoGroups();
  const page = fragment/*html*/`
    <div class="TodoList">
      <div class="header">
        <h1 class="title">Todo list</h1>
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
        <div class="">
          <a class="itemLink" href="">
            <h3 class="itemTitle">
              ${group.title}
            </h3>
            <div class="itemDescription">${group.description}</div>
          </a>
        </div>
        <div class="itemButtons">
          <button class="button buttonPrimary" onclick="">
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

function validation(name) {
  return `
    required 
    oninvalid="this.setCustomValidity('Please enter a valid ${name}');this.parentElement.classList.add('input_error')"
    oninput="this.setCustomValidity('');this.parentElement.classList.remove('input_error')"
  `;
}