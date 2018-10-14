import TaskManager from './taskmanager.js';
import * as taskmaker from './taskmaker.js';
import {parse} from './taskparser.js';

const taskList = document.querySelector('ul');

const input = document.querySelector('#taskInput');
input.addEventListener('keypress', handleKeyPress);

const taskArray = loadTasksFromLocalStorage();
prepareTaskList(taskArray);

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
  if (e.code === 'Enter' && input.value.length > 0) {
    addTask(input.value);
  }
}

function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('taskeeTasks');
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

export { saveTasksToLocalStorage };
