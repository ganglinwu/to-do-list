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
    [addProjIconElement, addProjText].forEach(htmlElement => htmlElement.addEventListener('click', (e) => {
        const title = prompt('Please enter title of Project');
        const description = prompt('Please enter a short description of this project');
        gyh.projects[title] = new Project(title, description);
        removeAllChildNodes(projListDiv);
        projListDiv.appendChild(loadSidebarProj());
    }))
    return mainContainerDiv;
}

export function loadTodo(clickEvent) {
    const todoList = createEle('div', 'class', 'todoList');
    const todoDiv = createEle('div', 'class', 'todoDiv');
    const projTitle = clickEvent.target.innerText;
    if (gyh.projects[projTitle].length>0) {
        gyh.projects[projTitle].forEach(todo => {
            if (todo.names.length < 18) {
                todoDiv.innerText = todo.name;
            } else {
                const shortenedtodoName = todo.name.slice(0,18);
                todoDiv.innerText = shortenedtodoName;
            }
            todoDiv.addEventListener('click', doSomething); //TODO: doSomething
    })} else {
        todoDiv.innerText = 'todolist is empty, would you like to add todo?'; 
    }
    todoList.appendChild(todoDiv);
    return todoList;
};
