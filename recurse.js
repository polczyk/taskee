import tasks from './tasks.js';
import taskManager from './taskmanager.js';
import {TaskManager} from './taskmanager.js';

let selectedTask = tasks[0].subTasks[0].subTasks[0];
let selectedElement = null;
let selectedIx = '';

const ul = document.querySelector('ul');

const input = document.querySelector('#taskInput');
input.addEventListener('keypress', e => {
  if (e.code === 'Enter') {
    if (selectedElement && selectedTask) {
      const newTask = {name: input.value}
      const newElement = createTaskElement(
        newTask, selectedElement);

      const ix = selectedTask.subTasks 
        ? selectedIx + selectedTask.subTasks.length + 1
        : selectedIx + '1';
      taskManager.add(newTask, selectedTask, selectedElement, newElement, ix);

      selectedElement.scrollIntoView();

      selectedElement = null;
      selectedTask = null;

      return;
    }

    const task = {name: input.value};
    tasks.push(task);
    const el = createTaskElement(task, tasks, tasks.length + '.');
    ul.appendChild(el);
    el.scrollIntoView();
    return;
  }
});

tasks.forEach((e, ix) => {
  const li = createTaskElement(e, tasks, ix + 1 + '.');
  ul.appendChild(li);
});

function recurse(obj, ix) {
  if (!hasSubtasks(obj)) {
    return document.createDocumentFragment();
  }

  const ul = document.createElement('ul');

  obj.subTasks.forEach((task, i) => {
    const li = createTaskElement(task, obj, ix + (i + 1) + '.');

    ul.appendChild(li);
  });

  return ul;
}

function hasSubtasks(obj) {
  return obj.hasOwnProperty('subTasks') && obj.subTasks.length > 0
}

// @param task - Task object used to create the html element.
// @param parent - Html element used to append new element.
// @param ix - Numerical task prefix eg. 1.2.2.
// @returns {HTMLElement} Element containing task info.
function createTaskElement(task, parent, ix) {
  const li = document.createElement('li');
  const manager = new TaskManager(task, parent, li);
  
  const p = document.createElement('p');
  p.innerText = ix + ' ' + task.name;
  li.appendChild(p);

  const btnCollapse = document.createElement('button');
  btnCollapse.innerText = 'Collapse';
  btnCollapse.classList.add('collapse');
  p.appendChild(btnCollapse);

  const btnAddTask = document.createElement('button');
  btnAddTask.innerText = 'Add Task';
  btnAddTask.classList.add('add');
  p.appendChild(btnAddTask);

  const btnEditTask = document.createElement('button');
  btnEditTask.innerText = 'Edit';
  p.appendChild(btnEditTask);

  const btnRemoveTask = document.createElement('button');
  btnRemoveTask.innerText = 'Remove';
  btnRemoveTask.classList.add('remove');
  p.appendChild(btnRemoveTask);

  li.addEventListener('click', manager.handleClick.bind(manager));
  li.addEventListener('keypress', manager.handleKeypress.bind(manager));

  const sub = recurse(task, ix);
  li.appendChild(sub);

  return li;
}