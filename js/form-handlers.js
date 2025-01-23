// @ts-check
/// <reference path="./types.d.ts" />

import { getTodoGroups, saveTodos } from './data.js';
import { goToGroupList } from './event.js';
import { getTodoGroupsTemplate, getTodosTemplate } from './render.js';

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

export function handleEditTodoGroup(event) {
  event.preventDefault();
  const data = serializeForm(event.target);
  const todos = getTodoGroups();
  const id = data.get("id");
  const title = data.get("title");
  const description = data.get("description");

  const i = todos.findIndex( object=> object.id === Number(id));
  todos[i] = {
    ...todos[i],
    title: title,
    description: description
  }

  saveTodos(todos);

  goToGroupList();
}

export function handleAddTodo(event) {
  event.preventDefault();

  const data = serializeForm(event.target);
  const todos = getTodoGroups();
  const title = data.get("title");
  const id = Number(data.get("groupID"));
  const i = todos.findIndex( object=> object.id === Number(id));
  const group = todos[i];
    const newTodo = {
      id: group.todos.length + 1,
      title,
      status: "in progress",
    };
    group.todos.push(newTodo);
  saveTodos(todos);

  const noGroups = document.getElementById("noGroups");
  const todosList = document.querySelector(".todos__list");
  if (!todosList) return;
  if(noGroups) { 
    todosList.removeChild(noGroups);
  }

  const newTodoList = getTodosTemplate([newTodo]);
  todosList.insertAdjacentHTML("beforeend", newTodoList);

  document.forms[0]?.reset();
}

function serializeForm(formNode) {
  return new FormData(formNode)
}
