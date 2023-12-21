import createEle from './createEle.js';
import { revealDetails, hideDetails } from './revealdetails.js';

export function createTodoDivShort(todo) {
    const todoDiv = createEle('div', 'class', 'todoDiv');
    if (todo.name.length < 18) {
        todoDiv.innerText = todo.name;
    } else {
        const shortenedtodoName = todo.name.slice(0,18);
        todoDiv.innerText = shortenedtodoName;
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
