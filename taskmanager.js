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
    this.addSubtasksArray();

    const subTask = { name: taskName };

    this.task.subTasks.push(subTask);
    this.addSubtaskToDOM(subTask);
    
    this.hideInputBox();
    saveTasksToLocalStorage();
  }

  addSubtaskToDOM(task) {
    const taskElement = createTaskHtml(task, this.task);
    const manager = new TaskManager(task, this.task, taskElement);
    this.element.querySelector('ul').appendChild(taskElement);
  }

  addSubtasksArray() {
    if (!this.task.subTasks) 
      this.task.subTasks = [];
  }
  
  startAddingSubtask() {
    this.showStub();
  }

  startEditing() {
    this.showEditInput();
    this.element.querySelector('p').classList.add('hidden');
  }

  registerEventHandlers() {
    this.element.addEventListener('click', e => EventHandler.handleClick(e, this));
    this.element.addEventListener('keypress', e => EventHandler.handleKeypress(e, this));
    this.element.addEventListener('focusout', e => EventHandler.handleFocusout(e, this));
  }

  remove() {
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
    this.element.classList.toggle('collapsed');
    this.toggleCollapseIcon();
  }

  toggleCollapseIcon() {
    const icon = this.element.querySelector('.collapse');
    if (icon.classList.contains('fa-caret-up')) {
      icon.classList.replace('fa-caret-up', 'fa-caret-down');
    }
    else if (icon.classList.contains('fa-caret-down')) {
      icon.classList.replace('fa-caret-down', 'fa-caret-up');
    }
  }

  showStub() {
    this.element.querySelector('.task-item-stub')
        .classList.remove('hidden');
    this.element.querySelector('.task-item-stub')
        .querySelector('input').focus();
  }

  hideStub() {
    this.element.querySelector('.task-item-stub')
        .classList.add('hidden');
  }

  clearStubInput() {
    this.element.querySelector('.task-item-stub')
        .querySelector('input').value = '';
  }

  showEditInput() {
    this.element.querySelector('.task-edit').classList.remove('hidden');
    this.element.querySelector('.task-edit').value = this.task.name;
    this.element.querySelector('.task-edit').focus();
    this.element.querySelector('.task-edit').select();
  }

  hideEditInput() {
    this.element.querySelector('.task-edit').classList.add('hidden');
    this.element.querySelector('.task-edit').value = '';
  }

  update(newName) {
    this.task.name = newName;
    this.element.querySelector('div')
      .querySelector('p')
      .textContent = this.task.name;

    this.hideEditInput();
    this.element.querySelector('p').classList.remove('hidden');
    saveTasksToLocalStorage();
  }
}

export default TaskManager;
