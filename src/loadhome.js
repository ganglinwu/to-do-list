import createEle from './createEle.js';
import {
    gyh,
    loadSidebarProj,
    removeAllChildNodes,
    isProjRendered,
    updateLocalStorage,
} from './index.js';

import Project from './projects.js';

import logo from './img/logo/png/logo-no-background.png';
import addProjIcon from './img/add-task-icon.png';
import loadTodo from './loadtodo.js';
// add task icon by icons8

export default function loadHome() {
    // create main container div
    const mainContainerDiv = createEle('div', 'id', 'mainContainerDiv');

    // create header
    const header = createEle('div', 'id', 'header');
    const headerLeft = createEle('div', 'id', 'headerLeft');
    const headerRight = createEle('div', 'id', 'headerRight');
    header.appendChild(headerLeft);
    header.appendChild(headerRight);

    // create logo
    const logoElement = createEle('img', 'id', 'headerLogo');
    logoElement.src = logo;
    logoElement.style.height = '3rem';
    logoElement.style.width = '9rem';
    headerLeft.appendChild(logoElement);
    mainContainerDiv.appendChild(header);

    // legend
    const legendContainer = createEle('div', 'id', 'legendContainer');
    const legendText = createEle('div', 'id', 'legendText');
    legendText.innerText = 'Legend: ';
    const highPriorityLegend = createEle('div', 'id', 'highPriorityLegend');
    highPriorityLegend.innerText = 'High Priority';
    const mediumPriorityLegend = createEle('div', 'id', 'mediumPriorityLegend');
    mediumPriorityLegend.innerText = 'Medium Priority';
    const lowPriorityLegend = createEle('div', 'id', 'lowPriorityLegend');
    lowPriorityLegend.innerText = 'Low Priority';

    headerRight.appendChild(legendContainer);
    [
        legendText,
        highPriorityLegend,
        mediumPriorityLegend,
        lowPriorityLegend,
    ].forEach((div) => legendContainer.appendChild(div));

    // Quick View row 1
    const quickViewContainer = createEle('div', 'id', 'quickViewContainer');
    const quickViewText = createEle('div', 'id', 'quickViewText');
    quickViewText.innerText = 'Quick View: ';
    const thisWeekQuickViewBtn = createEle(
        'button',
        'id',
        'thisWeekQuickViewBtn'
    );
    thisWeekQuickViewBtn.setAttribute('type', 'button');
    thisWeekQuickViewBtn.innerText = 'This week';
    const highPriorityQuickViewBtn = createEle(
        'button',
        'id',
        'highPriorityQuickViewBtn'
    );
    highPriorityQuickViewBtn.setAttribute('type', 'button');
    highPriorityQuickViewBtn.innerText = 'High Priority';
    const expiredQuickViewBtn = createEle(
        'button',
        'id',
        'expiredQuickViewBtn'
    );
    expiredQuickViewBtn.setAttribute('type', 'button');
    expiredQuickViewBtn.innerText = 'Expired';

    headerRight.appendChild(quickViewContainer);
    [
        quickViewText,
        thisWeekQuickViewBtn,
        highPriorityQuickViewBtn,
        expiredQuickViewBtn,
    ].forEach((div) => {
        quickViewContainer.appendChild(div);
        const projTitle = div.innerText;
        if (projTitle === 'Quick View: ') {
            return;
        } else {
            div.addEventListener('click', (e) => {
                isProjRendered(projTitle) ? e.preventDefault() : loadTodo(e);
            });
        }
    });

    // Quick View row 2
    const quickViewContainer2 = createEle('div', 'id', 'quickViewContainer2');
    const fiveMinQuickViewBtn = createEle(
        'button',
        'id',
        'fiveMinQuickViewBtn'
    );
    fiveMinQuickViewBtn.setAttribute('type', 'button');
    fiveMinQuickViewBtn.innerText = '< 5 min';
    const fiveToThirtyMinQuickViewBtn = createEle(
        'button',
        'id',
        'fiveToThirtyMinQuickViewBtn'
    );
    fiveToThirtyMinQuickViewBtn.setAttribute('type', 'button');
    fiveToThirtyMinQuickViewBtn.innerText = '5 < duration < 30';
    const thirtyToSixtyMinQuickViewBtn = createEle(
        'button',
        'id',
        'thirtyToSixtyMinQuickViewBtn'
    );
    thirtyToSixtyMinQuickViewBtn.setAttribute('type', 'button');
    thirtyToSixtyMinQuickViewBtn.innerText = '30 < duration < 60';

    headerRight.appendChild(quickViewContainer2);
    [
        fiveMinQuickViewBtn,
        fiveToThirtyMinQuickViewBtn,
        thirtyToSixtyMinQuickViewBtn,
    ].forEach((div) => {
        quickViewContainer2.appendChild(div);
        div.addEventListener('click', (e) => {
            const projTitle = div.innerText;
            isProjRendered(projTitle) ? e.preventDefault() : loadTodo(e);
        });
    });

    //create sidebar
    const sidebar = createEle('div', 'id', 'sidebar');

    // add project container
    const addProjContainer = createEle('div', 'id', 'addProjContainer');
    sidebar.appendChild(addProjContainer);

    // add project in sidebar
    const addProjIconElement = createEle('img', 'id', 'addProjIcon');
    addProjIconElement.src = addProjIcon;
    addProjContainer.appendChild(addProjIconElement);

    // add project text
    const addProjText = createEle('span', 'id', 'addProjText');
    addProjText.innerText = 'Add Project';
    addProjContainer.appendChild(addProjText);

    // add list of projects
    sidebar.appendChild(loadSidebarProj());

    mainContainerDiv.appendChild(sidebar);

    // create main Content Div, where to do lists will be shows (categorized by projects)
    const content = createEle('div', 'id', 'content');

    mainContainerDiv.appendChild(content);

    // event listener for add project
    [addProjIconElement, addProjText].forEach((htmlElement) =>
        htmlElement.addEventListener('click', (e) => {
            const title = prompt('Please enter title of Project');
            if (isProjDuplicated(title)) {
                alert('A project with the same name already exists!');
                e.preventDefault();
            } else {
                const description = prompt(
                    'Please enter a short description of this project'
                );
                gyh.projects[title] = new Project(title, description);
                const projListDiv = document.getElementById('projListDiv');
                removeAllChildNodes(projListDiv);
                projListDiv.remove();
                sidebar.appendChild(loadSidebarProj());
                updateLocalStorage();
            }
        })
    );
    return mainContainerDiv;
}

// helper function to check if project with the same title exists

function isProjDuplicated(title) {
    return gyh.projects[title];
}
