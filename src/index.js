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

export const gyh = {
    projects: {
        '< 2 mins': new Project('< 2 mins', 'tasks that take less than 2 minutes to complete'),
        '< 10 mins': new Project('< 10 mins', 'tasks that take less than 10 minutes to complete'),
        '< 30 mins': new Project('< 30 mins', 'tasks that take less than 30 minutes to complete'),
        '< 60 mins': new Project('< 60 mins', 'tasks that take less than 60 minutes to complete'),
        '> 60 mins': new Project('> 60 mins', 'tasks that take more than 60 minutes to complete'),
    }, 


    add: function(Proj){
        this.projects[Proj.title] = Proj
    },

   remove: function(Proj){
        if (this.projects[Proj.title]) {
            delete this.projects[Proj.title];    
        } else {
            alert(`${Proj.title} does not exist!`);
        }
    },
   };

document.body.appendChild(loadHome());

// helper function to refresh list of projects in sidebar
export function loadSidebarProj() {
    const projListContainer = createEle('div');
    Object.keys(gyh.projects).forEach((key) => {
        const projDiv = createEle('div', 'class', 'projDiv');
        if (gyh.projects[key].title.length < 18) {
            projDiv.innerText = gyh.projects[key].title;
        } else {
            const shortenedProjTitle = gyh.projects[key].title.slice(0,18);
            projDiv.innerText = shortenedProjTitle;
        }
        projDiv.addEventListener('click', (e) => {
            content.appendChild(loadTodo(e))
        });
        projListContainer.appendChild(projDiv);
    });
    return projListContainer
}

// helper function to remove child nodes
export function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
