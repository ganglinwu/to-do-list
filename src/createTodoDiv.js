import createEle from './createEle.js';
import { revealDetails, hideDetails } from './revealdetails.js';
import checklistIconSrc from './img/checklist.png';

export function createTodoDivShort(todo) {
    const todoDiv = createEle('div', 'class', 'todoDiv');
    const todoTitle = createEle('div', 'class', 'todoTitle');
    const dueDateDiv = createEle('div', 'class', 'dueDateDiv');
    if (todo.name.length < 18) {
        todoTitle.innerText = todo.name;
    } else {
        const shortenedtodoName = todo.name.slice(0,18);
        todoTitle.innerText = shortenedtodoName;
    }   
    todoDiv.appendChild(todoTitle);

    dueDateDiv.innerText = `${todo.dueDate.getDate()}-${todo.dueDate.getMonth() +1}-${todo.dueDate.getFullYear()}`
    todoDiv.appendChild(dueDateDiv);
    if (todo.checklistRequired) {
        const checklistIcon = new Image();
        checklistIcon.src = checklistIconSrc;
        checklistIcon.style.height = '12px';
        checklistIcon.style.width = '12px';
        checklistIcon.style.margin = '0 0 0 auto'; //top right bottom left
        todoDiv.appendChild(checklistIcon);
    }
    // add class according to priority
    if (todo.priority === 'High') {
        todoDiv.classList.add('highPriority');
    } else if (todo.priority === 'Medium') {
        todoDiv.classList.add('mediumPriority');
   } else if (todo.priority === 'Low'){
        todoDiv.classList.add('lowPriority');
    }
    todoDiv.addEventListener('click', revealDetails); //TODO: show details of todo
    return todoDiv;
}
// TODO: display dueDate and checklist icon

export function createTodoDivDetailed(todo){
    const todoDiv = createEle('div', 'class', 'todoDivDetailed');
    todoDiv.classList.add('hidden');
    todoDiv.innerText = todo.name + ' This is the detailed version of the todo';
    // add class according to priority
    if (todo.priority === 'High') {
        todoDiv.classList.add('highPriority');
    } else if (todo.priority === 'Medium') {
        todoDiv.classList.add('mediumPriority');
   } else if (todo.priority === 'Low'){
        todoDiv.classList.add('lowPriority');
    }
    todoDiv.addEventListener('click', hideDetails);
    return todoDiv
}

//TODO: consider writing a class for this since both functions need to access the date object
//alternatively consider a date class somewhere we can access the date
