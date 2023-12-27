import createEle from './createEle.js';
import { revealDetails, hideDetails } from './revealdetails.js';
import editIconSrc from './img/icons8-edit-26.png'

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
    todoDiv.appendChild(dueDateIconWrapper);

    dueDateDiv.innerText = `${todo.dueDate.getDate()}-${todo.dueDate.getMonth() +1}-${todo.dueDate.getFullYear()}`
    dueDateIconWrapper.appendChild(dueDateDiv);
    // add class according to priority
    if (todo.priority === 'High') {
        todoDiv.classList.add('highPriority');
    } else if (todo.priority === 'Medium') {
        todoDiv.classList.add('mediumPriority');
   } else if (todo.priority === 'Low'){
        todoDiv.classList.add('lowPriority');
    }
    todoDiv.addEventListener('click', revealDetails); 
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
    
    const todoDivDetailsArr = [todoDivDetailedName, todoDivDetailedDescription, todoDivDetailedDueDate, todoDivDetailedDuration, todoDivDetailedCompleted, todoDivDetailedPriority]
    
    
    todoDivDetailsArr.forEach(element=> {
        // obtained key by slicing the first 15 characters
        // i.e. todoDivDetailedName => Name
        const capitalizedName = element.classList[0].slice(15);
        // lowercase only the first letter 
        // e.g. Name => name , DueDate => dueDate
        const camelCaseName = capitalizedName[0].toLowerCase() + capitalizedName.slice(1);

        const labelName = removeUpperCamelCase(capitalizedName); 
        
        //initialize edit icon
        const editIcon = new Image();
        editIcon.src = editIconSrc;
        editIcon.style.height = '12px';
        editIcon.style.width = '12px';
        editIcon.classList.add('editIcon');

        // initialize divs
        const label = createEle('div', 'class', 'todoLabel');
        label.innerText = labelName;
        const content = createEle('div', 'class', 'content');
        // check if Date object, we just want to concatenated date string
        if (todo[camelCaseName] instanceof Date) {
            content.innerText = todo[camelCaseName].toLocaleDateString();
        } else {
            content.innerText = todo[camelCaseName];
        }    
        element.appendChild(label);
        element.appendChild(content);
        element.appendChild(editIcon);
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



// helper function to turn UpperCamelCase to normal word
function removeUpperCamelCase(word) {
    let result = '';
    result += word[0];
    for (let i=1; i<word.length; i++){
        if (word[i] === word[i].toUpperCase()) {
            result += ` ${word[i]}`;
        } else {
            result += word[i];
        }
    }
    result += ':';
    return result
}
