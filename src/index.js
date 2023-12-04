import './style.css';

import createEle from './createEle.js';
import {loadHome, loadTodo} from './loadhome.js';

import Project from './projects.js';

// gyh object
// gyh stands for guenyang hae, kinda means "just do it"
//
//
// reflections: I could have called this object todo
// then accessing the methods or projects would look nice like this
// e.g. todo.projectName.push(new Project)
// however if we access deeper it could lead to name clash confusion
// e.g. todo.projectName.todoArray['to do name'].toggleTodoComplete()
// below the gyh object we have the Project class and below that we have the Todo class
// i.e. gyh >> Project >> ToDo
// personally i think a different name would be less confusing thus gyh

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
