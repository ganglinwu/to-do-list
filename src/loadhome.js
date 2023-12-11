import logo from './img/logo/png/logo-no-background.png';
import addProjIcon from './img/add-task-icon.png'; 
// add task icon by icons8

import createEle from './createEle.js';
import {gyh, loadSidebarProj, removeAllChildNodes} from './index.js';
import Project from './projects.js';
import Todo from './todo.js';

export function loadHome() {
    // create main container div
    const mainContainerDiv = createEle('div', 'id', 'mainContainerDiv');

    // create header
    const header = createEle('div', 'id', 'header');

    // create logo
    const logoElement = createEle('img', 'id', 'headerLogo');
    logoElement.src = logo;
    logoElement.style.height = '4rem';
    logoElement.style.width = '12rem';
    header.appendChild(logoElement);
    mainContainerDiv.appendChild(header)

    //create sidebar
    const sidebar = createEle('div', 'id', 'sidebar');

    // add project in sidebar
    const addProjIconElement = createEle('img', 'id', 'addProjIcon');
    addProjIconElement.src = addProjIcon;
    sidebar.appendChild(addProjIconElement);

    // add project text
    const addProjText = createEle('span', 'id', 'addProjText');
    addProjText.innerText = 'Add Project'
    sidebar.appendChild(addProjText);

    // add list of projects
    const projListDiv = createEle('div', 'id', 'projListDiv');
    projListDiv.appendChild(loadSidebarProj());
    sidebar.appendChild(projListDiv);

    mainContainerDiv.appendChild(sidebar);


    // create main Content Div, where to do lists will be shows (categorized by projects)
    const content = createEle('div', 'id', 'content');

    mainContainerDiv.appendChild(content);

    // event listener for add project
    [addProjIconElement, addProjText].forEach(htmlElement => htmlElement.addEventListener('click', () => {
        const title = prompt('Please enter title of Project');
        const description = prompt('Please enter a short description of this project');
        gyh.projects[title] = new Project(title, description);
        removeAllChildNodes(projListDiv);
        projListDiv.appendChild(loadSidebarProj());
    }))
    return mainContainerDiv;
}

export function loadTodo(clickEvent) {
    const todoList = createEle('div', 'class', 'todoList'); // this is the overall div that we will return at end of function
    const projTitle = clickEvent.target.innerText;
    const projTitleNoWhiteSpace = projTitle.replace(/\s/g, ""); // we need to give this todoList div a specific id
    todoList.setAttribute('id', projTitleNoWhiteSpace);  // this will allow us to refresh the todolist after adding todo items
    const projTitleDiv = createEle('div', 'class', 'projTitleDiv'); // div to contain title of Project
    const todoContainer = createEle('div', 'class', 'todoContainer'); // div to containerize all the todo items under Project

    projTitleDiv.innerText = projTitle;
    todoList.appendChild(projTitleDiv);

    // loop through each todo under project and place todo name into a div
    // but first check if todo array is empty
    if (gyh.projects[projTitle].todoArray.length>0) {
        gyh.projects[projTitle].todoArray.forEach(todo => {
            const todoDiv = createEle('div', 'class', 'todoDiv');
            if (todo.name.length < 18) {
                todoDiv.innerText = todo.name;
            } else {
                const shortenedtodoName = todo.name.slice(0,18);
                todoDiv.innerText = shortenedtodoName;
            }
            todoDiv.addEventListener('click', console.log('TODO: show details of todo item')); //TODO: show details of todo
            todoContainer.appendChild(todoDiv);
        })
    } else {
        const todoDiv = createEle('div', 'class', 'todoDiv');
        todoDiv.innerText = 'todolist is empty, would you like to add todo?'; 
        todoContainer.appendChild(todoDiv); 
    }
    todoList.appendChild(todoContainer);

    // add input to add todo
    const addTodoInput = createEle('input', 'class', 'addTodoInput');
    addTodoInput.setAttribute('placeholder', '+  Add todo e.g. Water plants');

    // instead of a button to "submit" we listen for enter keyup
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

    todoList.appendChild(addTodoInput);

    return todoList;
};

// helper function to load form to ask user about details of new todo
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
    nameLabel.innerText = 'Name';
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('required', '');
    nameInput.setAttribute('placeholder', 'e.g. Water plants, Print report etc');
    nameInput.value = todoName;
    nameLi.appendChild(nameLabel);
    nameLi.appendChild(nameInput);
    todoFormUl.appendChild(nameLi);

    // description label and input
    const descriptionLi = createEle('li', 'class', 'descriptionLi');
    const descriptionLabel = createEle('label', 'for', 'description');
    const descriptionInput = createEle('input', 'name', 'description');
    descriptionLabel.innerText = 'Description';
    descriptionInput.setAttribute('type', 'text');
    descriptionInput.setAttribute('placeholder', 'Enter a short description');
    descriptionLi.appendChild(descriptionLabel);
    descriptionLi.appendChild(descriptionInput);
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
    dueDateLi.appendChild(dueDateLabel);
    dueDateLi.appendChild(dueDateInput);
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
    durationInput.setAttribute('placeholder', 'e.g. 1 hour = 60 (mins)');
    durationInput.setAttribute('min', '1');
    durationInput.setAttribute('type', 'number');
    durationInput.setAttribute('type', 'number');
    durationInput.setAttribute('type', 'number');
    durationLi.appendChild(durationLabel);
    durationLi.appendChild(durationInput);
    todoFormUl.appendChild(durationLi);

    // completed label and input
    const completedLi = createEle('li', 'class', 'completedLi');
    const completedLabel = createEle('label', 'for', 'completed');
    const completedInput = createEle('input', 'name', 'completed');
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
    priorityInput.setAttribute('required', '');
    priorityLi.appendChild(priorityLabel);
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
    priorityLi.appendChild(priorityInput);
    todoFormUl.appendChild(priorityLi);

    // checklist label and input
    const checklistLi = createEle('li', 'class', 'checklistLi');
    const checklistLabel = createEle('label', 'for', 'checklist');
    const checklistInput = createEle('input', 'name', 'checklist');
    checklistLabel.innerText = 'Do you need a checklist?';
    checklistInput.setAttribute('type', 'checkbox');
    checklistInput.setAttribute('value', 'true');
    checklistLi.appendChild(checklistLabel);
    checklistLi.appendChild(checklistInput);
    todoFormUl.appendChild(checklistLi);

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
                checklistInput.value
                )
            if (ProjectObject.isTodoDuplicate(newTodo)) {
                alert('A todo with the same name and due date already exists in this project. Please try again.')
            } else {
                ProjectObject.todoArray.push(newTodo);
                alert(`Todo: ${nameInput.value} has been added to project: ${ProjectObject.title}`)
                removeAllChildNodes(todoFormContainer);
                mainContainerDiv.removeChild(todoFormContainer);
            }
            console.log(e) //TODO: remove after test

            // TODO: refresh the todoList
            //  in order to do this we need the todolist to have a specific css selector id
            //  this would involve changing parameters of loadTodo function
            const todoDiv = createEle('div', 'class', 'todoDiv');
            if (newTodo.name.length < 18) {
                todoDiv.innerText = newTodo.name;
            } else {
                const shortenedtodoName = newTodo.name.slice(0,18);
                todoDiv.innerText = shortenedtodoName;
            }
            todoDiv.addEventListener('click', console.log('TODO: show details of todo item')); //TODO: show details of todo
            
            const projTitle = ProjectObject.title
            const projTitleNoWhiteSpace = projTitle.replace(/\s/g, '');
            const todoList = document.getElementById(projTitleNoWhiteSpace)
            todoList.children[1].appendChild(todoDiv);
        } else e.preventDefault();
    })
})
