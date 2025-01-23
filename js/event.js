import { getTodoGroups, saveTodos } from './data.js';
import { renderEditTodoGroup, renderTodoList } from './render.js';

export function actionWithGroup(event) {
    const buttonID = event.target.id;
    if(buttonID.includes("removeBtn")) {
        removeGroup(Number(buttonID.slice(9)));
    }
    else if (buttonID.includes("editBtn")) {

        goToEditingGroup(Number(buttonID.slice(7)));
    }
}

export function goToGroupList() {
    const container = document.querySelector(".content");
      if (!container) return;
      container.replaceChildren(renderTodoList());
}

function goToEditingGroup(groupID) {
    const todos = getTodoGroups();

    const group = todos.findIndex((object)=> {return object.id === groupID});

    const container = document.querySelector(".content");
      if (!container) return;

      container.replaceChildren(

        renderEditTodoGroup(todos[group])
    );
}
export function removeGroup(groupID) {
    const todos = getTodoGroups();

    todos.splice(todos.findIndex((object)=> {return object.id === groupID}), 1);

    saveTodos(todos);

    document.getElementById(groupID).remove();

    if (todos.length === 0)
        removeAllGroups();
}

export function removeAllGroups() {
    localStorage.removeItem("todos");
    
    const groupsList = document.querySelector(".groups__list");
    if (!groupsList) return;
    groupsList.innerHTML = /*html*/`<h5 id="noGroups" class="no-entries">No entries yet. Add new one using the form above.</h5>`;
}