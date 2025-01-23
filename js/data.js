


export function getTodoGroups() {
  const baseTodoGroups = [];

  const todosFromStorage = localStorage.getItem("todos");
  
  if (todosFromStorage) {
    try {
      // @ts-ignore
      const todoGroupsStore = JSON.parse(todosFromStorage);
      // @ts-ignore
      return todoGroupsStore;
    } catch (e) {
      console.log(e)
      localStorage.removeItem("todos");
    }
  }
  return baseTodoGroups;
}


export function saveTodos(todoGroups) {
  
  localStorage.setItem("todos", JSON.stringify(todoGroups));
}