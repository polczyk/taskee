import tasks from './tasks.js';
import TaskManager from './taskmanager.js';

const ul = document.querySelector('ul');

const input = document.querySelector('#taskInput');
input.addEventListener('keypress', e => {
  if (e.code === 'Enter') {
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
  if (hasSubtasks(e)) {
    li.appendChild(recurse(e));
  }
  ul.appendChild(li);
});

function recurse(obj, ix) {
  if (!hasSubtasks(obj)) {
    return document.createDocumentFragment();
  }

  const ul = document.createElement('ul');

  obj.subTasks.forEach((task, i) => {
    const li = createTaskElement(task, obj, ix + (i + 1) + '.');
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
// @param ix - Numerical task prefix eg. 1.2.2.
// @returns {HTMLElement} Element containing task info.
function createTaskElement(task, parent, ix) {
  const li = document.createElement('li');
  li.classList.add('task-item');
  const manager = new TaskManager(task, parent, li);
  
  const p = document.createElement('p');
  p.innerText = ix + ' ' + task.name;
  li.appendChild(p);

  const btnCollapse = document.createElement('button');
  btnCollapse.innerHTML = '<i class="fas fa-caret-up"></i>';
  btnCollapse.classList.add('collapse');
  p.appendChild(btnCollapse);

  const btnAddTask = document.createElement('button');
  btnAddTask.innerHTML = '<i class="fas fa-plus"></i>';
  btnAddTask.classList.add('add');
  p.appendChild(btnAddTask);

  const btnEditTask = document.createElement('button');
  btnEditTask.innerHTML = '<i class="fas fa-edit"></i>';
  p.appendChild(btnEditTask);

  const btnRemoveTask = document.createElement('button');
  btnRemoveTask.innerHTML = '<i class="fas fa-trash-alt"></i>';
  btnRemoveTask.classList.add('remove');
  p.appendChild(btnRemoveTask);

  const input = document.createElement('input');
  input.style.display = 'none';
  p.appendChild(input);

  li.addEventListener('click', manager.handleClick.bind(manager));
  li.addEventListener('keypress', manager.handleKeypress.bind(manager));

  return li;
}

export { createTaskElement };