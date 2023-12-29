const buttonAddTask = document.getElementById('buttonCriar');
const inputField = document.getElementById('inputTask');
const taskListFormListEmpty = document.getElementById('taskListFormListEmpty');
const taskListFormList = document.getElementById('taskListFormList');
const taskItemPattern = document.getElementById('taskItemPattern');
const totalTaskCounterItem = document.getElementById('totalTaskCounter');
const completedTaskCounterItem = document.getElementById('completedTaskCounter');

let totalTaskCounter = 0
let completedTaskCounter = 0;


inputField.addEventListener('click', () => {
    if (inputField.classList.contains('error')) {
        inputField.classList.remove('error');
        inputField.style.border = "1px solid #0D0D0D";
    }
})

buttonAddTask.addEventListener('click', () => {
    let taskDescription = inputField.value;

    if (taskDescription) {
        addTask(taskDescription);
        changeFormListVisability();
        updateCounters();
    } else {
        showError();
    }
})

function addTask(taskDescription) {
    let newTask = taskItemPattern.cloneNode(true);

    inputField.value = '';
    newTask.id = '';
    newTask.children[1].innerText = taskDescription;
    totalTaskCounter++;

    if (totalTaskCounter == 1) {
        taskListFormList.appendChild(newTask);
    } else {
        taskListFormList.insertBefore(newTask, taskListFormList.children[0]);
    }
}

function updateCounters() {
    totalTaskCounterItem.innerHTML = totalTaskCounter;
    completedTaskCounterItem.innerHTML = completedTaskCounter + " / " + totalTaskCounter; 
}

function changeFormListVisability() {
    if (totalTaskCounter > 0) {
        taskListFormListEmpty.style.display = "none";
        taskListFormList.style.display = "flex";
    } else {
        taskListFormListEmpty.style.display = "flex";
        taskListFormList.style.display = "none";
    }
}

function showError() {
    if (!inputField.classList.contains('error')) {
        inputField.classList.add('error');
        inputField.style.border = "2px solid #E25858";
    }
}

function deleteTask(event) {
    let elemForDel = event.target.parentNode;

    while (elemForDel.className != 'taskItem') {
        elemForDel = elemForDel.parentNode;
    }
    if (elemForDel.children[0].checked) {
        completedTaskCounter--;
    }
    elemForDel.remove();
    totalTaskCounter--;
    updateCounters();
}

function changeCheckbox(event) {
    let checkbox = event.target;
    let taskItem = checkbox.parentNode;

    if (checkbox.checked) {
        completedTaskCounter++;
        if (totalTaskCounter > 1) {
            taskListFormList.appendChild(taskItem);
        }
    } else {
        completedTaskCounter--;
        if (totalTaskCounter > 1) {
            taskListFormList.insertBefore(taskItem, taskListFormList.children[0]);
        }
    }

    updateCounters();
}