import { saveTasksToLocalStorage } from './app.js';
import { createTaskHtml } from './taskmaker.js';
import EventHandler from './event-handler.js';

class TaskManager {
  constructor(task, parentTask, element) {
    this.task = task;
    this.parentTask = parentTask;
    this.element = element;
    
    this.editing = false;

    this.registerEventHandlers();
  }

  addSubtask(taskName) {
    const subTask = { name: taskName };
    if (!this.task.subTasks) this.task.subTasks = [];

    this.task.subTasks.push(subTask);

    if (!this.element.querySelector('ul')) {
      this.element.appendChild(document.createElement('ul'));
    }

    const taskElement = createTaskHtml(subTask, this.task);
    const manager = new TaskManager(subTask, this.task, taskElement);
    this.element.querySelector('ul').appendChild(taskElement);
    saveTasksToLocalStorage();
  }

  startAddingSubtask() {
    console.log('Adding subtask');

    this.showInputBox();
  }

  startEditing() {
    console.log('Editing task');

    this.showInputBox();

    this.editing = true;
  }

  registerEventHandlers() {
    this.element.addEventListener('click', e => EventHandler.handleClick(e, this));
    this.element.addEventListener('keypress', e => EventHandler.handleKeypress(e, this));
    this.element.addEventListener('focusout', e => EventHandler.handleFocusout(e, this));
  }

  remove() {
    console.log('Removing task');

    let index = null;
    let taskArray = null;

    taskArray = Array.isArray(this.parentTask) ? this.parentTask : this.parentTask.subTasks;

    index = taskArray.indexOf(this.task);
    taskArray.splice(index, 1);

    this.element.remove();
    saveTasksToLocalStorage();
  }

  removeSubtasks() {
    console.log('Remove subtasks dummy');
  }

  toggleCollapse() {
    console.log('Toggle collapse');
    this.element.classList.toggle('collapsed');
    this.toggleCollapseIcon();
  }

  toggleCollapseIcon() {
    const icon = this.element.querySelector('.collapse').querySelector('i');
    if (icon.classList.contains('fa-caret-up')) {
      icon.classList.replace('fa-caret-up', 'fa-caret-down');
    }
    else if (icon.classList.contains('fa-caret-down')) {
      icon.classList.replace('fa-caret-down', 'fa-caret-up');
    }
  }

  showInputBox() {
    const input = this.element.querySelector('input');
    input.style.display = 'initial';
    input.focus();
  }

  hideInputBox() {
    const input = this.element.querySelector('input');
    input.style.display = 'none';
    input.value = '';
  }

  update(newName) {
    console.log('Update')
    this.task.name = newName;
    this.element.querySelector('div')
      .querySelector('p')
      .textContent = this.task.name;
    this.editing = false;

    this.hideInputBox();
    saveTasksToLocalStorage();
  }
}

export default TaskManager;
