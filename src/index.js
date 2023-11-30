import './style.css';

import createEle from './createEle.js';

import logo from './img/logo/png/logo-no-background.png';
import addProjIcon from './img/add-task-icon.png'; 
// add task icon by icons8

import Project from './projects.js';

// IIFE to instantiate a project array "class"

export const projectArray = (function () {
    const projects = [];

    projects.push(new Project('< 2 mins', 'tasks that take less than 2 minutes to complete')) 
    projects.push(new Project('< 5 mins', 'tasks that take less than 5 minutes to complete'))
    projects.push(new Project('< 10 mins', 'tasks that take less than 10 minutes to complete')) 
    projects.push(new Project('< 30 mins', 'tasks that take less than 30 minutes to complete')) 
    projects.push(new Project('< 60 mins', 'tasks that take less than 60 minutes to complete')) 
    projects.push(new Project('> 60 mins', 'tasks that take more than 60 minutes to complete')) 

    const add = (Project) => projects.push(Project)
    const remove = (Project) => {
        if (projects.some(Project)) {
            const index = projects.indexOf(Project);
            projects.splice(index, 1);
        }
    }

    return { projects, add, remove }
   })();


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
refreshSidebarProjList();
sidebar.appendChild(projListDiv);

mainContainerDiv.appendChild(sidebar);


// create main Content Div, where to do lists will be shows (categorized by projects)
const content = createEle('div', 'id', 'content');

mainContainerDiv.appendChild(content);

document.body.appendChild(mainContainerDiv);

// event listener for add project
[addProjIconElement, addProjText].forEach(htmlElement => htmlElement.addEventListener('click', () => {
    const title = prompt('Please enter title of Project');
    const description = prompt('Please enter a short description of this project');
    projectArray.add(new Project(title, description));
    refreshSidebarProjList();
}))

// helper function to refresh list of projects in sidebar
function refreshSidebarProjList() {
    let projListString = '';
    projectArray.projects.forEach(Proj => {
        // check if this is last project in the array, if it is don't add a new line
        if (projectArray.projects.indexOf(Proj) === projectArray.projects.length - 1){

            // also check if the project title is too long 
            if (Proj.title.length < 18) {
            projListString += Proj.title;
            } else {
            const shortenedProjTitle = Proj.title.slice(0,18);
            projListString += shortenedProjTitle;
            }
        } else {
            if (Proj.title.length < 18) {
            projListString += Proj.title;
            projListString += '\n'
            } else {
            const shortenedProjTitle = Proj.title.slice(0,18);
            projListString += shortenedProjTitle;
            projListString += '\n';
            }
        }
    })

    // finally we update the innerText of div that contains project list in the sidebar
    projListDiv.innerText = projListString;
}


