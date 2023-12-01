import './style.css';

import createEle from './createEle.js';
import {loadHome, loadTask} from './loadhome.js';

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

document.body.appendChild(loadHome());

// helper function to refresh list of projects in sidebar
export function loadSidebarProj() {
    const projListContainer = createEle('div');
    projectArray.projects.forEach((Proj) => {
        const projDiv = createEle('div', 'class', 'projDiv');
        if (Proj.title.length < 18) {
            projDiv.innerText = Proj.title;
        } else {
            const shortenedProjTitle = Proj.title.slice(0,18);
            projDiv.innerText = shortenedProjTitle;
        }
        projDiv.addEventListener('click', loadTask)
        projListContainer.appendChild(projDiv);
    });
    return projListContainer
}

// helper function to remove child nodes
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
