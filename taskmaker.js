import {taskItemTemplate} from './app.js';

// Create the task manager and html element for a task.

// @param task - Task object used to create the html element.
// @param parentTask - Parent task holding the new subtask.
// @returns {HTMLElement} Element containing task info.
function createTaskHtml(task, parentTask) {
  const taskElement = document.importNode(taskItemTemplate, true);
  taskElement.removeAttribute('id');
  taskElement.removeAttribute('hidden');
  
  if (isTopLevelTask(parentTask)) {
    taskElement.classList.add('top-level');
  }

  taskElement.querySelector('p').textContent = task.name;
  return taskElement;
}

function createButton(icon, title, classes) {
  const button = document.createElement('button');
  button.innerHTML = `<i class="fas ${icon}"></i>`;
  button.setAttribute('title', title);
  classes.forEach(cls => {
    button.classList.add(cls);
  });

  return button;
}

function isTopLevelTask(parent) {
  return Array.isArray(parent);
}

export { createTaskHtml };
