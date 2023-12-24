import './style.css';

import createEle from './createEle.js';
import loadHome from './loadhome.js';
import loadTodo from './loadtodo.js';

import Project from './projects.js';
import Todo from './todo.js';

import checklistIcon from './img/checklist.png'; // Icon by <a class="link_pro" href="https://freeicons.io/essential-web-4/checklist-check-mark-note-organizer-icon-40412">BECRIS</a> on <a href="https://freeicons.io">freeicons.io</a>

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
        'sample project': new Project('sample project', 'sample project for demonstration purpose'),
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

// TEST code to manually add todos

const dateToday = new Date();
const currentDay = dateToday.getDate();
const currentMonth = dateToday.getMonth();
const currentYear = dateToday.getFullYear();

//                                      constructor(name, description, dueDate, todoDuration, completed, priority, checklistRequired)
gyh.projects['sample project'].todoArray.push(new Todo('print pdf', 'for mum\'s visa application', new Date(currentYear, currentMonth+1, currentDay), 2, false, 'high', true));
gyh.projects['sample project'].todoArray.push(new Todo('water plants', 'green bean plant', new Date(currentYear, currentMonth, currentDay), 1, false, 'low', false));


document.body.appendChild(loadHome());

// helper function to refresh list of projects in sidebar
export function loadSidebarProj() {
    const projListDiv = createEle('div', 'class', 'projListDiv');
    Object.keys(gyh.projects).forEach((key) => {
        const projDiv = createEle('div', 'class', 'projDiv');
        if (gyh.projects[key].title.length < 18) {
            projDiv.innerText = gyh.projects[key].title;
        } else {
            const shortenedProjTitle = gyh.projects[key].title.slice(0,18);
            projDiv.innerText = shortenedProjTitle;
        }

        // add event listener for each Proj in the sidebar
        projDiv.addEventListener('click', (e) => {
            const projTitle = e.target.innerText;
            // first check if project of same name alredy rendered in content area
            isProjRendered(projTitle) ? e.preventDefault() : loadTodo(e);
           
        });
        
        // add to container, end of loop
        projListDiv.appendChild(projDiv);
    });
    return projListDiv
}

// helper function to remove child nodes
export function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// helper function to check if project has already been rendered in content area
function isProjRendered(projTitle) {
    const renderedProjTitleDivNodeList = document.querySelectorAll('.projTitleDiv');
    const renderedProjTitles = [];
    Array.from(renderedProjTitleDivNodeList).forEach((div)=> renderedProjTitles.push(div.innerText))
    if (renderedProjTitles.includes(projTitle)) {
       return true; 
    } else return false; 
}
