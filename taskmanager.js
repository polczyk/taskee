import { createTaskElement } from './app.js';

class TaskManager {
  constructor(task, parentTask, element) {
    this.task = task;
    this.parentTask = parentTask;
    this.element = element;
    
    this.element.addEventListener('click', this.handleClick.bind(this));
    this.element.addEventListener('keypress', this.handleKeypress.bind(this));
  }

  addSubtask() {
    console.log('Adding subtask');
    this.element.querySelector('input').style.display = 'initial';
  }

  remove() {
    console.log('Removing task');

    let index = null;
    let taskArray = null;

    taskArray = Array.isArray(this.parentTask) ? this.parentTask : this.parentTask.subTasks;

    index = taskArray.indexOf(this.task);
    taskArray.splice(index, 1);

    this.element.remove();
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

  handleClick(event) {
    event.stopPropagation();

    if (event.target.nodeName === 'BUTTON') {
      if (event.target.classList.contains('collapse')) {
        this.toggleCollapse();
      }

      if (event.target.classList.contains('remove')) {
        this.remove();
      }

      if (event.target.classList.contains('add')) {
        /* selectedTask = task;
        selectedElement = li;
        selectedIx = ix;
        input.focus(); */
        this.addSubtask();
      }
    }
  }

  handleKeypress(event) {
    event.stopPropagation();
    
    if (event.code === 'Enter') {
      const inputElement = this.element.querySelector('input');

      if (inputElement.value.length === 0)
        return;
        
      const task = {name: inputElement.value};
      if (!this.task.subTasks) this.task.subTasks = [];

      this.task.subTasks.push(task);

      if (!this.element.querySelector('ul')) {
        this.element.appendChild(document.createElement('ul'));
      }

      const taskElement = createTaskElement(task, this.task, '');
      const manager = new TaskManager(task, this.task, taskElement);
      this.element.querySelector('ul').appendChild(taskElement);

      inputElement.value = '';
      inputElement.style.display = 'none';
    }
  }
}

export default TaskManager;
