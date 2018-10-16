import TaskManager from './taskmanager.js';
import * as taskmaker from './taskmaker.js';
import {parse} from './taskparser.js';

let taskItemTemplate = null;
const taskArray = loadTasksFromLocalStorage();
const taskList = document.querySelector('ul');
const input = document.querySelector('#taskInput');
input.addEventListener('keypress', handleKeyPress);

init();

function init() {
  fetch('./template.html')
  .then(res => res.text())
  .then(text => {
    initializeTaskTemplate(text);
    prepareTaskList(taskArray);
  })
  .catch(e => console.log(e));
}

function initializeTaskTemplate(text) {
  const parser = new DOMParser();
  const html = parser.parseFromString(text, 'text/html');
  taskItemTemplate = html.querySelector('#task-item-template');
}

function addTask(taskName) {
  const task = {name: taskName};
  taskArray.push(task);
  const htmlElement = taskmaker.createTaskHtml(task, taskArray);
  const manager = new TaskManager(task, taskArray, htmlElement);
  taskList.appendChild(htmlElement);
  htmlElement.scrollIntoView();
  input.value = '';
  saveTasksToLocalStorage();
}

function handleKeyPress(e) {
  if (e.key === 'Enter' && input.value.length > 0) {
    addTask(input.value);
  }
}

function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('taskeeTasks') || '[]';
  const tasks = JSON.parse(storedTasks);

  return tasks;
}

function prepareTaskList(tasks) {
  taskList.appendChild(parse(tasks));
}

function saveTasksToLocalStorage() {
  console.log('Saving tasks to local storage: ');
  console.log(taskArray);
  
  window.localStorage.setItem('taskeeTasks', JSON.stringify(taskArray));
}

export { saveTasksToLocalStorage, taskItemTemplate };
