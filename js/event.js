import { getTodoGroups, saveTodos } from './data.js';

export function actionWithGroup(event) {
    const buttonID = event.target.id;
    if(buttonID.includes("removeBtn")) {
        removeGroup(Number(buttonID.slice(8)));
    }
}

export function removeGroup(groupID) {
    const todos = getTodoGroups();

    todos.splice(todos.findIndex((object)=> {return object.id === groupID}), 1);

    saveTodos(todos);

    const group = document.getElementById(groupID);
    if (!group) return;

    group.innerHTML = "";
}

export function removeAllGroups() {
    localStorage.removeItem("todos");
    
    const groupsList = document.querySelector(".groups__list");
    if (!groupsList) return;
    groupsList.innerHTML = /*html*/`<h5 id="noGroups" class="no-entries">No entries yet. Add new one using the form above.</h5>`;
}