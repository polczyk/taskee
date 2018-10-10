import TaskManager from './taskmanager.js';
import * as taskmaker from './taskmaker.js';
import {parse} from './taskparser.js';

const ul = document.querySelector('ul');
const storedTasks = localStorage.getItem('taskeeTasks');
const tasks = JSON.parse(storedTasks);

const input = document.querySelector('#taskInput');
ul.appendChild(parse(tasks));

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

function saveToLocalStorage() {
  window.localStorage.setItem('taskeeTasks', JSON.stringify(tasks));
}
export { saveToLocalStorage };
