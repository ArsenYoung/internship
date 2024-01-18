'use strict';

const buttonAddTask = jQuery('#buttonCriar');
const inputTaskField = jQuery('#inputTask');
const listTaskItemsEmpty = jQuery('#taskListFormListEmpty');
const listTaskItems = jQuery('#taskListFormList');
const taskItemPattern = jQuery('#taskItemPattern');
const totalTaskCountItem = jQuery('#totalTaskCounter');
const completedTaskCountItem = jQuery('#completedTaskCounter');

let totalTaskCount = 0;
let completedTaskCount = 0;

inputTaskField.keypress((event) => {
    if (event.which === 13) {
        runTaskCreating();
    }
})

buttonAddTask.click(() => {
    runTaskCreating();
});

function runTaskCreating() {
    if (!isInputFieldEmpty()) {
        if (totalTaskCount === 0) {
            showListTaskItems();
        }
        let newTask = createNewTaskItem(inputTaskField.val())
        addNewTaskItemToList(newTask);
        updateCounters();
        clearInputValue();
    }
}

function clearInputValue() {
    inputTaskField.val('');
}

function updateCounters() {
    totalTaskCountItem.text(totalTaskCount);
    completedTaskCountItem.text(`${completedTaskCount} / ${totalTaskCount}`);
}

function isInputFieldEmpty() {
    if (inputTaskField.val() === '') {
        inputTaskField.css('border-color', 'var(--danger)');
        return true;
    } else {
        inputTaskField.css('border-color', '');
    }
    return false;
}

function createNewTaskItem(taskDescription) {
    totalTaskCount++;
    let newTask = taskItemPattern.clone();
    newTask.removeAttr('id');
    newTask.find('label').text(taskDescription);
    newTask.css('display', 'flex');

    return newTask;
}

function completeTaskItem(taskItem) {
    completedTaskCount++;
    listTaskItems.append(taskItem);
}

function returnTaskItemToWork(taskItem) {
    completedTaskCount--;
    listTaskItems.prepend(taskItem);
}

function addNewTaskItemToList(newTask) {
    listTaskItems.prepend(newTask);
}

function showListTaskItems() {
    listTaskItemsEmpty.hide();
    listTaskItems.css('display', 'flex');
}

function changeCheckbox(event) {
    let item = event.target;
    if (item.checked) {
        completeTaskItem($(item).parent());
        updateCounters();
    } else {
        returnTaskItemToWork($(item).parent());
        updateCounters();
    }
}

function deleteTask(event) {
    let item = $(event.target).closest('.taskItem');
    let checkbox = item.find('input');
    totalTaskCount--;
    if (checkbox[0].checked) {
        completedTaskCount--;
    }
    item[0].remove();
    updateCounters();
}