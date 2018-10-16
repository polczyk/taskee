const EventHandler = {};

EventHandler.handleClick = (event, taskManager) => {

  event.stopPropagation();

  if (event.target.nodeName === 'BUTTON') {
    if (event.target.classList.contains('collapse')) {
      taskManager.toggleCollapse();
    }

    if (event.target.classList.contains('remove')) {
      taskManager.remove();
    }

    if (event.target.classList.contains('add')) {
      taskManager.startAddingSubtask();
    }

    if (event.target.classList.contains('edit')) {
      taskManager.startEditing()
    }
  }
}

EventHandler.handleKeypress = (event, taskManager) => {
  event.stopPropagation();

  const inputElement = taskManager.element.querySelector('input');

  if (event.key === 'Enter') {
    if ( inputElement.value.length === 0) return;

    if (taskManager.editing) {
      taskManager.update(inputElement.value);
    } else {
      taskManager.addSubtask(inputElement.value);
    }
  }
}

EventHandler.handleFocusout = (event, taskManager) => {
  if (event.target.nodeName === 'INPUT') {
    event.stopPropagation();

    taskManager.hideInputBox();
  }
}

export default EventHandler;
