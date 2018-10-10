import TaskManager from './taskmanager.js';
import * as taskmaker from './taskmaker.js';

const ul = document.querySelector('ul');
const storedTasks = localStorage.getItem('taskeeTasks');
const tasks = JSON.parse(storedTasks);

const input = document.querySelector('#taskInput');
input.addEventListener('keypress', e => {
  if (e.code === 'Enter') {
    const task = {name: input.value};
    tasks.push(task);
    const el = taskmaker.createTaskElement(task, tasks, tasks.length + '.');
    const manager = new TaskManager(task, tasks, el);
    ul.appendChild(el);
    el.scrollIntoView();

    saveToLocalStorage();
    return;
  }
});

tasks.forEach((e) => {
  const li = taskmaker.createTaskElement(e, tasks);
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
    const li = taskmaker.createTaskElement(task, obj);
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

function saveToLocalStorage() {
  window.localStorage.setItem('taskeeTasks', JSON.stringify(tasks));
}
export { saveToLocalStorage };
