import './output.css';

import createEle from './createEle.js';
import loadHome from './loadhome.js';
import loadTodo from './loadtodo.js';

import Project from './projects.js';
import Todo from './todo.js';

import trashIconSrc from './img/icons8-trash-24.png'; //<a target="_blank" href="https://icons8.com/icon/4B0kCMNiLlmW/trash">Trash</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>

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

export let gyh = {
    projects: {
        'sample project': new Project(
            'sample project',
            'sample project for demonstration purpose'
        ),
    },

    add: function (Proj) {
        this.projects[Proj.title] = Proj;
    },

    remove: function (Proj) {
        if (this.projects[Proj.title]) {
            delete this.projects[Proj.title];
        } else {
            alert(`${Proj.title} does not exist!`);
        }
    },
};

// check if localStorage is available
if (storageAvailable('localStorage')) {
    // check if gyh is already written to localStorage
    if (localStorage.getItem('gyh') !== null) {
        let gyhFromLocalStorage = JSON.parse(localStorage.getItem('gyh'));
        Object.values(gyhFromLocalStorage.projects).forEach((val) => {
            gyh.projects[val.title] = new Project(val.title, val.description);
            const todoIndice = Object.keys(
                gyhFromLocalStorage.projects[val.title].todoArray
            );
            if (todoIndice.length) {
                for (const indexNum in todoIndice) {
                    const todo =
                        gyhFromLocalStorage.projects[val.title].todoArray[
                            indexNum
                        ];
                    const dueDateObj = new Date(todo.dueDate.slice(0, 10));
                    gyh.projects[val.title].todoArray.push(
                        new Todo(
                            todo.projectTitle,
                            todo.name,
                            todo.description,
                            dueDateObj,
                            todo.duration,
                            todo.completed,
                            todo.priority
                        )
                    );
                }
            }
        });
    } else {
        // if gyh is not in locaStorage then this is likely the first visit, let's write gyh into localStorage
        // first populate with sample todos, then write into localStorage.
        for (const todo of generateSampleTodoArray()) {
            gyh.projects['sample project'].todoArray.push(todo);
        }
        localStorage.setItem('gyh', JSON.stringify(gyh));
    }
} else {
    for (const todo of generateSampleTodoArray()) {
        gyh.projects['sample project'].todoArray.push(todo);
    }
}

// load home page
document.body.appendChild(loadHome());

/* -------------------- START OF helper functions --------------------  */

// helper function to refresh list of projects in sidebar
export function loadSidebarProj() {
    const projListDiv = createEle('div', 'id', 'projListDiv');
    Object.keys(gyh.projects).forEach((key) => {
        const projDiv = createEle('div', 'class', 'projDiv');
        projDiv.classList.add('flex', 'justify-start');
        const projTitleSidebarDiv = createEle(
            'div',
            'class',
            'projTitleSidebarDiv'
        );
        const deleteProj = createEle('img', 'class', 'deleteProj');
        deleteProj.src = trashIconSrc;
        if (gyh.projects[key].title.length < 18) {
            projTitleSidebarDiv.innerText = gyh.projects[key].title;
        } else {
            const shortenedProjTitle = gyh.projects[key].title.slice(0, 18);
            projTitleSidebarDiv.innerText = shortenedProjTitle;
        }
        projDiv.appendChild(projTitleSidebarDiv);
        projDiv.appendChild(deleteProj);

        // add event listener for each Proj in the sidebar
        projTitleSidebarDiv.addEventListener('click', (e) => {
            const projTitle = e.target.innerText;
            // first check if project of same name alredy rendered in content area
            isProjRendered(projTitle) ? e.preventDefault() : loadTodo(e);
        });

        // add event listener for each delete icon in the sidebar
        deleteProj.addEventListener('click', (e) => {
            const projTitle = projTitleSidebarDiv.innerText;
            const projTitleNoWhiteSpace =
                projTitle.replace(/\s/g, '') + 'PROJECT';
            let deleteConfirmText = prompt(
                `To confirm delete, please enter '${projTitle}'`
            );
            if (deleteConfirmText === projTitle) {
                if (isProjRendered(projTitle)) {
                    const renderedProjTodoList = document.getElementById(
                        projTitleNoWhiteSpace
                    );
                    removeAllChildNodes(renderedProjTodoList);
                    renderedProjTodoList.remove();
                }
                const sidebarProj = e.target.parentElement;
                removeAllChildNodes(sidebarProj);
                sidebarProj.remove();
                delete gyh.projects[projTitle];
                alert(`${projTitle} has been deleted!`);
                updateLocalStorage();
            } else {
                e.preventDefault();
                alert('Project not deleted.');
            }
        });

        // add to container, end of loop
        projListDiv.appendChild(projDiv);
    });
    return projListDiv;
}

// helper function to remove child nodes
export function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// helper function to check if project has already been rendered in content area
export function isProjRendered(projTitle) {
    const renderedProjTitleDivNodeList =
        document.querySelectorAll('.projTitleDiv');
    const renderedProjTitles = [];
    Array.from(renderedProjTitleDivNodeList).forEach((div) =>
        renderedProjTitles.push(div.innerText)
    );
    if (renderedProjTitles.includes(projTitle)) {
        return true;
    } else return false;
}

// helper function to check available
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
// function takes argument of "localStorage" or "sessionStorage"
function storageAvailable(type) {
    let storage;
    try {
        storage = window[type];
        const x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    } catch (e) {
        return (
            e instanceof DOMException &&
            // everything except Firefox
            (e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        );
    }
}

function generateSampleTodoArray() {
    const dateToday = new Date();
    const currentDay = dateToday.getDate();
    const currentMonth = dateToday.getMonth();
    const currentYear = dateToday.getFullYear();

    const sampleTodoArray = [];
    //                                      constructor(name, description, dueDate, duration, completed, priority)
    sampleTodoArray.push(
        new Todo(
            'sample project',
            'print pdf',
            "for mum's visa application",
            new Date(currentYear, currentMonth + 1, currentDay),
            2,
            false,
            'High'
        )
    );
    sampleTodoArray.push(
        new Todo(
            'sample project',
            'water plants',
            'green bean plant',
            new Date(currentYear, currentMonth, currentDay),
            1,
            false,
            'Low'
        )
    );
    return sampleTodoArray.values();
}

// helper function to update localStorage
export function updateLocalStorage() {
    if (storageAvailable('localStorage')) {
        localStorage.setItem('gyh', JSON.stringify(gyh));
    }
}
/* -------------------- END OF helper functions --------------------  */
