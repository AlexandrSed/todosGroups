// @ts-check
/// <reference path="./types.d.ts" />

import { getTodoGroups, saveTodos } from './data.js';
import { removeGroup } from './event.js';
import { getTodoGroupsTemplate } from './render.js';

export function handleAddTodoGroup(event) {
  event.preventDefault();

  const data = serializeForm(event.target);
  const todos = getTodoGroups();
  const title = data.get("title");
  const description = data.get("description");
    const newGroup = {
      id: todos.length + 1,
      title,
      description,
      todos: [],
    };
    todos.push(newGroup);
  saveTodos(todos);

  const noGroups = document.getElementById("noGroups");
  const groupsList = document.querySelector(".groups__list");
  if (!groupsList) return;
  if(noGroups) { 
    groupsList.removeChild(noGroups);
  }

  const newGroupList = getTodoGroupsTemplate([newGroup]);
  groupsList.insertAdjacentHTML("beforeend", newGroupList);

  document.forms[0]?.reset();
}

function serializeForm(formNode) {
  return new FormData(formNode)
}
