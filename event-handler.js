const EventHandler = {};

EventHandler.handleClick = (event, taskManager) => {
  console.log('EventHandler.handleClick():');
  console.log(event, taskManager);

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

export default EventHandler;