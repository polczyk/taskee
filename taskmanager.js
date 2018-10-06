export default {
  collapse: function(task, element, parent) {
    element.classList.toggle('collapsed');
  },

  remove: function(task, parent, element) {
    const id = parent.subTasks.indexOf(task);
    parent.subTasks.splice(id, 1);
  
    element.remove();
  },

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
