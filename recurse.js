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

tasks.forEach((e) => {
  const li = createTaskElement(e, tasks);
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
  const manager = new TaskManager(task, parent, li);
  
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

  const btnCollapse = document.createElement('button');
  btnCollapse.innerHTML = '<i class="fas fa-caret-up"></i>';
  btnCollapse.setAttribute('title', 'Hide subtasks');
  btnCollapse.classList.add('collapse');
  divRight.appendChild(btnCollapse);

  const btnAddTask = document.createElement('button');
  btnAddTask.innerHTML = '<i class="fas fa-plus"></i>';
  btnAddTask.setAttribute('title', 'Add new subtask');
  btnAddTask.classList.add('add');
  divRight.appendChild(btnAddTask);

  const btnEditTask = document.createElement('button');
  btnEditTask.innerHTML = '<i class="fas fa-edit"></i>';
  btnEditTask.setAttribute('title', 'Edit this task');
  divRight.appendChild(btnEditTask);

  const btnRemoveTask = document.createElement('button');
  btnRemoveTask.innerHTML = '<i class="fas fa-trash-alt"></i>';
  btnRemoveTask.setAttribute('title', 'Remove this task');
  btnRemoveTask.classList.add('remove');
  divRight.appendChild(btnRemoveTask);

  const input = document.createElement('input');
  input.style.display = 'none';
  divRight.appendChild(input);

  flexContainer.appendChild(divRight);

  li.addEventListener('click', manager.handleClick.bind(manager));
  li.addEventListener('keypress', manager.handleKeypress.bind(manager));

  return li;
}

export { createTaskElement };