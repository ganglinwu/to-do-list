import {gyh, loadSidebarProj, removeAllChildNodes} from './index.js';
import createEle from './createEle.js'
import { createTodoDivShort, createTodoDivDetailed } from './createTodoDiv.js';
import { addNewProject } from './loadhome.js';

import Project from './projects.js';
import Todo from './todo.js';

export default function loadTodo(clickEvent) { 
    const todoList = createEle('div', 'class', 'todoList'); // this is the overall div that we will return at end of function
    const projTitle = clickEvent.target.innerText;
    const projTitleNoWhiteSpace = projTitle.replace(/\s/g, "") + 'PROJECT'; // we need to give this todoList div a specific id, to prevent namespace clash, salt with 'PROJECT'
    todoList.setAttribute('id', projTitleNoWhiteSpace);  // this will allow us to refresh the todolist after adding todo items
    const projTitleWrapper = createEle('div', 'class', 'projTitleWrapper'); // div to wrap title and close todolist div
    const projTitleDiv = createEle('div', 'class', 'projTitleDiv'); // div to contain title of Project
    
    // closeTodoList button
    const closeTodoList = createEle('button', 'type', 'button');
    closeTodoList.classList.add('closeTodoList');
    const closeTodoListText = createEle('p', 'class', 'closeTodoListText');
    closeTodoListText.innerText = 'x';
    closeTodoList.appendChild(closeTodoListText);

    const todoContainer = createEle('div', 'class', 'todoContainer'); // div to containerize all the todo items under Project

    projTitleDiv.innerText = projTitle;
    projTitleWrapper.appendChild(projTitleDiv);
    projTitleWrapper.appendChild(closeTodoList);
    todoList.appendChild(projTitleWrapper);
    todoList.appendChild(todoContainer);
    content.appendChild(todoList)

    // refresh todolist
    if (Object.keys(gyh.projects).length) { // first check if there are projects
        refreshTodoList(gyh.projects[projTitle]);
    } 

    // wrapper for input and submit btn
    const inputWrapper = createEle('div', 'class', 'inputWrapper');

    
    // add input to add todo
    const addTodoInput = createEle('input', 'class', 'addTodoInput');
    addTodoInput.setAttribute('placeholder', '+ e.g. Water plants');

    // add todo btn
    const submitTodoBtn = createEle('button', 'class', 'submitTodoBtn');
    submitTodoBtn.setAttribute('type', 'button');
    submitTodoBtn.innerText = '+';

    // eventListener for submit button
    submitTodoBtn.addEventListener('click', (e)=> {
        const todoName = addTodoInput.value;
        if (!todoName) {
            e.preventDefault();
        } else {
            addNewTodoForm(todoName, gyh.projects[projTitle]);

            // clear input field to prevent recursive error
            addTodoInput.value = '';
        }
    })

    // instead of button to "submit" we also listen for enter keyup
    addTodoInput.addEventListener('keyup', (e)=> {
        if (e.key === 'Enter') {
            const todoName = addTodoInput.value;
            if (!todoName) {
                e.preventDefault();
            } else {
                addNewTodoForm(todoName, gyh.projects[projTitle]);

                // clear input field to prevent recursive error
                addTodoInput.value = '';
            }
        }
    })

    // eventListener for closeTodoList button
    closeTodoList.addEventListener('click', (e)=> {
        // target = closeTodoListText (paragraph)
        // 1st parent = closeTodoList (button)
        // 2nd parent = projTitleWrapper (div)
        // 3rd parent = div that contains the todos in the project
        const projTodoList = e.target.parentElement.parentElement.parentElement;
        removeAllChildNodes(projTodoList);
        projTodoList.remove();
    })

    inputWrapper.appendChild(addTodoInput);
    inputWrapper.appendChild(submitTodoBtn);
    todoList.appendChild(inputWrapper);
};

// since the form is created and should be GC once it is done
// IIFE is perfect for this use case
const addNewTodoForm = (function (todoName, ProjectObject) {
    // pop up form will take up the whole screen
    // so we will append to mainContainerDiv
    const mainContainerDiv = document.getElementById('mainContainerDiv');

    // this will be the container for the add todo form
    // we will apply backdrop-filter blur to blur the entire page 
    const todoFormContainer = createEle('div', 'class', 'todoFormContainer');

    // to do form
    const todoForm = createEle('form', 'class', 'todoForm');
    todoForm.setAttribute('action', './');
    //todoForm.setAttribute('method', 'post');

    // title of to do form
    const title = createEle('div', 'class', 'todoFormTitle');
    title.innerText = 'Add todo';
    todoForm.appendChild(title);

    // use unordered list to neatly add label and input fields
    const todoFormUl = createEle('ul', 'class', 'todoFormUl');

    // name label and input
    const nameLi = createEle('li', 'class', 'nameLi');
    const nameLabel = createEle('label', 'for', 'name');
    const nameInput = createEle('input', 'name', 'name');
    nameLabel.innerText = 'Todo name';
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('required', '');
    nameInput.value = todoName;
    nameLi.appendChild(nameInput);
    nameLi.appendChild(nameLabel);
    todoFormUl.appendChild(nameLi);

    // description label and input
    const descriptionLi = createEle('li', 'class', 'descriptionLi');
    const descriptionLabel = createEle('label', 'for', 'description');
    const descriptionInput = createEle('input', 'name', 'description');
    descriptionLabel.innerText = 'Description';
    descriptionInput.setAttribute('type', 'text');
    descriptionLi.appendChild(descriptionInput);
    descriptionLi.appendChild(descriptionLabel);
    todoFormUl.appendChild(descriptionLi);

    // dueDate label and input
    // date is required
    const dueDateLi = createEle('li', 'class', 'dueDateLi');
    const dueDateLabel = createEle('label', 'for', 'dueDate');
    const dueDateInput = createEle('input', 'name', 'dueDate');
    dueDateLabel.innerText = 'Due Date';
    dueDateInput.setAttribute('type', 'date'); 
    dueDateInput.setAttribute('required', '');
    const today = new Date();
    dueDateInput.setAttribute('min', today.toJSON().slice(0,10)); //use date string to set min date value
    dueDateInput.setAttribute('min', today.toJSON().slice(0,10)); //use date string to set default date value
    dueDateLi.appendChild(dueDateInput);
    dueDateLi.appendChild(dueDateLabel);
    todoFormUl.appendChild(dueDateLi);
    
    // duration label and input
    // required input
    // prevent negative numbers
    const durationLi = createEle('li', 'class', 'durationLi');
    const durationLabel = createEle('label', 'for', 'duration');
    const durationInput = createEle('input', 'name', 'duration');
    durationLabel.innerText = 'How long does this task take (in minutes)?';
    durationInput.setAttribute('required', '');
    durationInput.setAttribute('type', 'number');
    durationInput.setAttribute('min', '1');
    durationInput.setAttribute('type', 'number');
    durationInput.setAttribute('type', 'number');
    durationInput.setAttribute('type', 'number');
    durationLi.appendChild(durationInput);
    durationLi.appendChild(durationLabel);
    todoFormUl.appendChild(durationLi);

    // completed label and input
    const completedLi = createEle('li', 'class', 'completedLi');
    const completedLabel = createEle('label', 'for', 'completed');
    const completedInput = createEle('input', 'id', 'completed');
    completedLabel.innerText = 'Has this task been completed?';
    completedInput.setAttribute('type', 'checkbox');
    completedInput.setAttribute('placeholder', 'completed in minutes.');
    completedInput.setAttribute('value', 'true');
    completedLi.appendChild(completedLabel);
    completedLi.appendChild(completedInput);
    todoFormUl.appendChild(completedLi);

    // priority label and input
    // priority required
    const priorityLi = createEle('li', 'class', 'priorityLi');
    const priorityLabel = createEle('label', 'for', 'priority');
    const priorityInput = createEle('select', 'name', 'priority');
    priorityLabel.innerText = 'How urgent is this task?';
    ['Please choose', 'High', 'Medium', 'Low'].forEach(option => {
        const optHTML = createEle('option', 'class', 'priorityOptions');
        if (option !== 'Please choose'){
            optHTML.setAttribute('value', option);
        } else {
            optHTML.setAttribute('value', '');
        }
        optHTML.innerText = option;
        priorityInput.appendChild(optHTML);
    })
    priorityLi.appendChild(priorityLabel);
    priorityLi.appendChild(priorityInput);
    todoFormUl.appendChild(priorityLi);

    // add todo button
    const buttonLi = createEle('li', 'class', 'buttonLi');
    const addTodoBtn = createEle('button', 'class', 'addTodoBtn');
    addTodoBtn.innerText = 'Add Todo'
    buttonLi.appendChild(addTodoBtn);
    todoFormUl.appendChild(buttonLi);

    todoForm.appendChild(todoFormUl);

    todoFormContainer.appendChild(todoForm);
    mainContainerDiv.appendChild(todoFormContainer);

    todoFormContainer.addEventListener('click', (e)=> {
        if (e.target.className === 'todoFormContainer') {
            removeAllChildNodes(todoFormContainer);
            mainContainerDiv.removeChild(todoFormContainer);
        } 
    });
    // add event listener to button    
    addTodoBtn.addEventListener('click', (e) => {
        if (e.target.form.checkValidity()) {
            const newTodo = new Todo(
                nameInput.value, 
                descriptionInput.value, 
                new Date(dueDateInput.value), 
                durationInput.value, 
                completedLabel.value, 
                priorityInput.value, 
                )
            if (ProjectObject.isTodoDuplicate(newTodo)) {
                alert('A todo with the same name and due date already exists in this project. Please try again.')
            } else {
                ProjectObject.todoArray.push(newTodo);
                alert(`Todo: ${nameInput.value} has been added to project: ${ProjectObject.title}`)
                removeAllChildNodes(todoFormContainer);
                mainContainerDiv.removeChild(todoFormContainer);
            }
            // refresh the todoList
            refreshTodoList(ProjectObject);
        } else e.preventDefault();
    })
    // instead of button to "submit" we also listen for enter keyup
    todoFormContainer.addEventListener('keyup', (e)=> {
        if (e.key === 'Enter') {
            const newTodo = new Todo(
                nameInput.value, 
                descriptionInput.value, 
                new Date(dueDateInput.value), 
                durationInput.value, 
                completedLabel.value, 
                priorityInput.value, 
            )
            if (ProjectObject.isTodoDuplicate(newTodo)) {
                alert('A todo with the same name and due date already exists in this project. Please try again.')
            } else {
                ProjectObject.todoArray.push(newTodo);
                alert(`Todo: ${nameInput.value} has been added to project: ${ProjectObject.title}`)
                removeAllChildNodes(todoFormContainer);
                mainContainerDiv.removeChild(todoFormContainer);
            }
            // refresh the todoList
            refreshTodoList(ProjectObject);
        } else if (e.key === "Escape") { //listen for Escape and quit form
            removeAllChildNodes(todoFormContainer);
            mainContainerDiv.removeChild(todoFormContainer);
        } else e.preventDefault();
        }
    )
})

// helper function to refresh todo items in a todolist
function refreshTodoList(ProjectObj) {
    const projTitleNoWhiteSpace = ProjectObj.title.replace(/\s/g, "") + 'PROJECT'; // all todolists have id that contains no whitespace, and salted with 'PROJECT' to prevent namespace clash 
    const projDiv = document.getElementById(projTitleNoWhiteSpace);
    // firstly remove preveious todos
    // first child is the title of the todolist, so we append the second child
    removeAllChildNodes(projDiv.children[1]);
    
    // first check if Project has any todos
    if (ProjectObj.todoArray.length>0) {
        ProjectObj.todoArray.forEach(todo => { 
            projDiv.children[1].appendChild(createTodoDivShort(todo)); // add a short version of the todo
            projDiv.children[1].appendChild(createTodoDivDetailed(todo)); // add a detailed version which is hidden by default and position absolute
        })
    } else {
        const todoDiv = createEle('div', 'class', 'emptyTodoListPrompt'); 
        todoDiv.innerText = 'todolist is empty, click to add todo'; 
        todoDiv.addEventListener('click', (e)=> {
            // e.target = emptyTodoListPrompt div
            // 1st parent = todoContainer div
            // previous Sibling = projTitleWrapper div
            // firstChild = projTitle div
            const projTitle = e.target.parentElement.previousSibling.firstChild.innerText;
            const projObj = gyh.projects[projTitle];
            addNewTodoForm('', projObj);
        });
        projDiv.children[1].appendChild(todoDiv); 
    }
}

//TODO: form validation
