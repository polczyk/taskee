// Create the task manager and html element for a task.

// @param task - Task object used to create the html element.
// @param parent - Html element used to append new element.
// @returns {HTMLElement} Element containing task info.
function createTaskElement(task, parent) {
  const li = document.createElement('li');
  li.classList.add('task-item');
  if (isTopLevelTask(parent)) {
    li.classList.add('top-level');
  }
  
  const flexContainer = document.createElement('div');
  li.appendChild(flexContainer);

  const divLeft = document.createElement('div');
  divLeft.classList.add('flex-left');
  const p = document.createElement('p');
  p.innerText = task.name;
  divLeft.appendChild(p);
  flexContainer.appendChild(divLeft);

  const divRight = document.createElement('div');
  divRight.classList.add('flex-right');

  const btnCollapse = createButton('fa-caret-up', 'Hide subtasks', ['collapse']);
  divRight.appendChild(btnCollapse);

  const btnAddTask = createButton('fa-plus', 'Add new subtask', ['add']);
  divRight.appendChild(btnAddTask);

  const input = document.createElement('input');
  input.style.display = 'none';
  divRight.appendChild(input);

  const btnEditTask = createButton('fa-edit', 'Edit this task', ['edit']);
  divRight.appendChild(btnEditTask);

  const btnRemovetask = createButton('fa-trash-alt', 'Remove this task', ['remove']);
  divRight.appendChild(btnRemovetask);

  flexContainer.appendChild(divRight);

  return li;
}

function createButton(icon, title, classes) {
  const button = document.createElement('button');
  button.innerHTML = `<i class="fas ${icon}"></i>`;
  button.setAttribute('title', title);
  classes.forEach(cls => {
    button.classList.add(cls);
  });

  return button;
}

function isTopLevelTask(parent) {
  return Array.isArray(parent);
}

export { createTaskElement };
