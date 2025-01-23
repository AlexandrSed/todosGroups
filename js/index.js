import {renderTodoList} from './render.js';
import {initTheme} from "./theme.js";

document.addEventListener("DOMContentLoaded", start);


function start() {
  const root = document.getElementById("root");
  if (!root) return;
  root.innerHTML = /*html*/`
    <div class="container">
      <div class="content"></div>
    </div>` 
  const container = document.querySelector(".content");
  if (!container) return;
  container.replaceChildren(renderTodoList());
//   root.addEventListener("click", handleClick);
  initTheme()
//   initCustomEvents()
//   fixHeightForm()
}