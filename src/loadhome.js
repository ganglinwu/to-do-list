import logo from './img/logo/png/logo-no-background.png';
import addProjIcon from './img/add-task-icon.png'; 
// add task icon by icons8

import createEle from './createEle.js';
import {gyh, loadSidebarProj, removeAllChildNodes} from './index.js';
import Project from './projects.js';

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
    const projTitleDiv = createEle('div', 'class', 'projTitleDiv'); // div to contain title of Project
    const todoContainer = createEle('div', 'class', 'todoContainer'); // div to containerize all the todo items under Project

    const projTitle = clickEvent.target.innerText;
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
    return todoList;
};
