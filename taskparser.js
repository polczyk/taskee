import TaskManager from './taskmanager.js';
import * as taskmaker from './taskmaker.js';

export function parse(tasks) {
  const documentFragment = document.createDocumentFragment();

  tasks.forEach((e) => {
    const li = taskmaker.createTaskHtml(e, tasks);
    const manager = new TaskManager(e, tasks, li);
  
    if (hasSubtasks(e)) {
      li.appendChild(recurse(e));
    }
    documentFragment.appendChild(li);
  });

  return documentFragment;
}

function recurse(obj) {
  if (!hasSubtasks(obj)) {
    return document.createDocumentFragment();
  }

  const ul = document.createElement('ul');

  obj.subTasks.forEach((task) => {
    const li = taskmaker.createTaskHtml(task, obj);
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
