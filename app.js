import TaskManager from './taskmanager.js';
import * as taskmaker from './taskmaker.js';
import {parse} from './taskparser.js';

const ul = document.querySelector('ul');
const input = document.querySelector('#taskInput');

const storedTasks = localStorage.getItem('taskeeTasks');
const tasks = JSON.parse(storedTasks);

ul.appendChild(parse(tasks));

input.addEventListener('keypress', handleKeyPress);

function addTask(name) {
  const task = {name: name};
  tasks.push(task);
  const element = taskmaker.createTaskElement(task, tasks);
  new TaskManager(task, tasks, element);
  ul.appendChild(element);
  element.scrollIntoView();

  saveTasksToLocalStorage();
}

function handleKeyPress(e) {
  if (e.code === 'Enter' && input.value.length > 0) {
    addTask(input.value);
  }
}

function saveTasksToLocalStorage() {
  console.log('Saving tasks to local storage: ');
  console.log(tasks);
  
  window.localStorage.setItem('taskeeTasks', JSON.stringify(tasks));
}

export { saveTasksToLocalStorage };
