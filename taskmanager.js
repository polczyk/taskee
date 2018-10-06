import { createTaskElement } from './recurse.js';

export default {
  add: function(task, parent, element, taskElement) {
    if (!parent.hasOwnProperty('subTasks')) {
      parent.subTasks = [];
      element.appendChild(document.createElement('ul'));
    }

    parent.subTasks.push(task);

    const ul = element.querySelector('ul');
    ul.appendChild(taskElement);
  }
};

class TaskManager {
  constructor(task, parentTask, element) {
    this.task = task;
    this.parentTask = parentTask;
    this.element = element;
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

      this.element.querySelector('ul').appendChild(createTaskElement(task, this.task, ''));

      inputElement.value = '';
      inputElement.style.display = 'none';
    }
  }
}

export {TaskManager};
