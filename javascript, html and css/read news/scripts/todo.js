'use strict'

const TODO_ARR = 'TODO_ARRAY';
const listUser = getFromStorage(KEY, []);

let todoArr = getFromStorage(TODO_ARR, []);
let todoArrUserLogin = [];
let user = new User();

const inputTodoEl = $('#input-task');
const btnAddEl = $('#btn-add');
const todoListEl = $('#todo-list');

/**
 * 
 * @param {*} text 
 * @param {*} warning 
 * @returns true if text is not empty | false if text is empty
 */
const isEmptyText = (text, warning = '') => {
    if (text)
        return true
    alert(warning)
    return false;
}

const checkDuplicateTask = (task, warning = '') => {
    const pos = findTaskUserLogin(task);
    if (pos < 0) return true;
    alert(warning)
    return false;
}

/**
 * Clear all value in form
 */
const clearForm = () => {
    inputTodoEl.value = "";
};

const getUser = () => {
    let user = getFromStorage(USER_LOGIN, null);
    if (user) {
        if (!user.firstName && !user.lastName && !user.userName && !user.password)
            return null
        else {
            return parseUser(user);
        }
    }
    return null;
}

/**
 * find user was login
 * @param {*} task 
 * @returns user
 */
const findTaskUserLogin = (task) => {
    if (todoArrUserLogin) {
        return todoArrUserLogin.findIndex(taskTodo => taskTodo.task.toUpperCase() === task.toUpperCase());
    }
    return -1;
}

/**
 * find user position
 * @param {*} todoList 
 * @param {*} username 
 * @param {*} task 
 * @returns position user in array
 */
const findTaskPosition = (todoList, username, task) => {
    if (todoArr) {
        return todoList.findIndex(taskTdo => taskTdo.task.toUpperCase() === task.toUpperCase() && taskTdo.owner === username);
    }
    return -1;
}

/**
 * rendefr todo list
 * @param {*} todoList 
 */
const renderTodoList = (todoList) => {
    const liELs = todoList.map((todo) => {
        if (todo.isDone) {
            return `<li id="${todo.task}" class="checked" onclick="toggleTask('${todo.task}')">${todo.task}<span onclick="deleteTask('${todo.task}')" class="close">×</span></li>`
        } else {
            return `<li id="${todo.task}" onclick="toggleTask('${todo.task}')">${todo.task}<span class="close" onclick="deleteTask('${todo.task}')">×</span></li>`
        }
    })
    todoListEl.innerHTML = liELs.join('');
}

/**
 * create new task in todo list
 * @param {*} text 
 */
const createNewTask = (text) => {
    const liEL = document.createElement('li');
    liEL.innerHTML = `${text}<span class="close" onclick="deleteTask('${text}')">×</span>`
    liEL.setAttribute('onclick', `toggleTask('${text}')`)
    liEL.setAttribute('id', `${text}`)
    todoListEl.append(liEL);
}

/**
 * change status task to done or not in todo list
 * @param {*} task 
 */
const toggleTask = (task) => {
    console.log("Toggle")
    const posTotoArr = findTaskPosition(todoArr, user.getUserName, task);
    const posTaskUserLogin = findTaskUserLogin(task);
    const liEl = $(`#${task}`);
    if (todoArr[posTotoArr].isDone) {
        todoArr[posTotoArr].isDone = false;
        todoArrUserLogin[posTaskUserLogin].isDone = false;
    } else {
        todoArr[posTotoArr].isDone = true;
        todoArrUserLogin[posTaskUserLogin].isDone = true;
    }
    saveToStorage(TODO_ARR, todoArr);
    // renderTodoList(todoArrUserLogin);
    // console.log(liEl)
    liEl.classList.toggle('checked')
}

/**
 * delete task in todo list
 * @param {*} task 
 */
const deleteTask = (task) => {
    console.log("delete")
    event.stopPropagation();
    const posTotoArr = findTaskPosition(todoArr, user.getUserName, task);
    const posTaskUserLogin = findTaskUserLogin(task);
    todoArr.splice(posTotoArr, 1);
    todoArrUserLogin.splice(posTaskUserLogin, 1)
    saveToStorage(TODO_ARR, todoArr);
    $(`#${task}`).remove();
    // renderTodoList(todoArrUserLogin);
}

/**
 * add todo list event
 */
function btnAddTodoEvent() {
    btnAddEl.addEventListener("click", function () {
        let isValidation = false;
        isValidation = isEmptyText(inputTodoEl.value.trim(), 'Please enter task you want to do!')
            && checkDuplicateTask(inputTodoEl.value.trim(), 'This task has already!')
        if (isValidation) {
            let todo = {
                task: inputTodoEl.value.trim(),
                owner: user.getUserName,
                isDone: false,
            }
            todoArr.push(todo);
            todoArrUserLogin.push(todo);
            saveToStorage(TODO_ARR, todoArr);
            alert("Add successfully!")
            createNewTask(inputTodoEl.value.trim())
            clearForm();
        }
    });
}

/**
 * init all function in todo.js
 */
const init = () => {
    user = getUser();
    if (user) {
        todoArrUserLogin = todoArr.filter(todoTask => {
            return todoTask.owner === user.getUserName;
        });
        renderTodoList(todoArrUserLogin)
        btnAddTodoEvent();
    }
}

init();

