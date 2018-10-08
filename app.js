import tasks from './tasks.js';
import TaskManager from './taskmanager.js';

const ul = document.querySelector('ul');

const input = document.querySelector('#taskInput');
input.addEventListener('keypress', e => {
  if (e.code === 'Enter') {
    const task = {name: input.value};
    tasks.push(task);
    const el = createTaskElement(task, tasks, tasks.length + '.');
    const manager = new TaskManager(task, tasks, el);
    ul.appendChild(el);
    el.scrollIntoView();
    return;
  }
});

tasks.forEach((e) => {
  const li = createTaskElement(e, tasks);
  const manager = new TaskManager(e, tasks, li);

  if (hasSubtasks(e)) {
    li.appendChild(recurse(e));
  }
  ul.appendChild(li);
});

function recurse(obj) {
  if (!hasSubtasks(obj)) {
    return document.createDocumentFragment();
  }

  const ul = document.createElement('ul');

  obj.subTasks.forEach((task) => {
    const li = createTaskElement(task, obj);
    const manager = new TaskManager(task, obj, li);

    if (hasSubtasks(task)) {
      li.appendChild(recurse(task));
    }

    ul.appendChild(li);
  });

  return ul;
}

function hasSubtasks(obj) {
  return obj.hasOwnProperty('subTasks') && obj.subTasks.length > 0
}

// @param task - Task object used to create the html element.
// @param parent - Html element used to append new element.
// @returns {HTMLElement} Element containing task info.
function createTaskElement(task, parent) {
  const li = document.createElement('li');
  li.classList.add('task-item');
  if (isTopLevelTask(parent)) {
    li.classList.add('top-level');
  }
  
  const flexContainer = document.createElement('div');
  li.appendChild(flexContainer);

  const divLeft = document.createElement('div');
  divLeft.classList.add('flex-left');
  const p = document.createElement('p');
  p.innerText = task.name;
  divLeft.appendChild(p);
  flexContainer.appendChild(divLeft);

  const divRight = document.createElement('div');
  divRight.classList.add('flex-right');

  const btnCollapse = createButton('fa-caret-up', 'Hide subtasks', ['collapse']);
  divRight.appendChild(btnCollapse);

  const btnAddTask = createButton('fa-plus', 'Add new subtask', ['add']);
  divRight.appendChild(btnAddTask);

  const input = document.createElement('input');
  input.style.display = 'none';
  divRight.appendChild(input);

  const btnEditTask = createButton('fa-edit', 'Edit this task', ['edit']);
  divRight.appendChild(btnEditTask);

  const btnRemovetask = createButton('fa-trash-alt', 'Remove this task', ['remove']);
  divRight.appendChild(btnRemovetask);

  flexContainer.appendChild(divRight);

  return li;
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

export { createTaskElement };