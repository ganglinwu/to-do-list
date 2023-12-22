import createEle from './createEle.js';
import { revealDetails, hideDetails } from './revealdetails.js';
import checklistIconSrc from './img/checklist.png';

export function createTodoDivShort(todo) {
    const todoDiv = createEle('div', 'class', 'todoDiv');
    const todoTitle = createEle('div', 'class', 'todoTitle');
    const dueDateIconWrapper= createEle('div', 'class', 'dueDateIconWrapper');
    const dueDateDiv = createEle('div', 'class', 'dueDateDiv');
    if (todo.name.length < 18) {
        todoTitle.innerText = todo.name;
    } else {
        const shortenedtodoName = todo.name.slice(0,18);
        todoTitle.innerText = shortenedtodoName;
    }   
    todoDiv.appendChild(todoTitle);

    dueDateDiv.innerText = `${todo.dueDate.getDate()}-${todo.dueDate.getMonth() +1}-${todo.dueDate.getFullYear()}`
    dueDateIconWrapper.appendChild(dueDateDiv);
    if (todo.checklistRequired) {
        const checklistIcon = new Image();
        checklistIcon.src = checklistIconSrc;
        checklistIcon.style.height = '12px';
        checklistIcon.style.width = '12px';
        dueDateIconWrapper.appendChild(checklistIcon);
    }
    todoDiv.appendChild(dueDateIconWrapper);
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
    // render div for each property of todo
    const todoDivDetailedName = createEle('div', 'class', 'todoDivDetailedName');
    const todoDivDetailedDescription = createEle('div', 'class', 'todoDivDetailedDescription');
    const todoDivDetailedDueDate = createEle('div', 'class', 'todoDivDetailedDueDate');
    const todoDivDetailedDuration = createEle('div', 'class', 'todoDivDetailedDuration');
    const todoDivDetailedCompleted = createEle('div', 'class', 'todoDivDetailedCompleted');
    const todoDivDetailedPriority = createEle('div', 'class', 'todoDivDetailedPriority');
    const todoDivDetailedChecklistBool = createEle('div', 'class', 'todoDivDetailedChecklistBool');
    const todoDivDetailedChecklist = createEle('div', 'class', 'todoDivDetailedChecklist');
    
    // test code
    const testArr = [todoDivDetailedName, todoDivDetailedDescription, todoDivDetailedDueDate, todoDivDetailedDuration, todoDivDetailedCompleted, todoDivDetailedPriority, todoDivDetailedChecklistBool, todoDivDetailedChecklist]

    testArr.forEach(element => {
        element.innerText = 'Test';
        todoDiv.appendChild(element);
    })

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
