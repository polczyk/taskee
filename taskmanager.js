export default {
  collapse: function(task, element, parent) {
    console.log(parent);
    console.log(task);
    console.log(element);
    element.classList.toggle('collapsed');
  },

  remove: function(task, parent, element) {
    console.log('Removing task');
    const id = parent.subTasks.indexOf(task);
    parent.subTasks.splice(id, 1);
  
    console.log(parent.subTasks);
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
