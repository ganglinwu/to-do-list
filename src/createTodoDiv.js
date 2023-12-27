import createEle from './createEle.js';
import { revealDetails, hideDetails } from './revealdetails.js';
import editIconSrc from './img/icons8-edit-26.png'
import { gyh } from './index.js';

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
    
    // initialize minimize button
    const minimizeBtn = createEle('button', 'type', 'button');
    minimizeBtn.classList.add('minimizeBtn');
    const minimizeBtnText = createEle('p', 'class', 'minimizeBtnText');
    minimizeBtnText.innerText = '-';

    minimizeBtn.appendChild(minimizeBtnText);
    todoDiv.appendChild(minimizeBtn);

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

        // initialze save edit button
        const saveEdit = createEle('button', 'type', 'button');
        saveEdit.classList.add('saveEdit');
        saveEdit.classList.add('hidden');
        saveEdit.innerText = 'Save'

        // initialize divs
        const label = createEle('div', 'class', 'todoLabel');
        label.innerText = labelName;
        const content = createEle('div', 'class', 'content');
        content.setAttribute('contenteditable', 'false');
        // check if Date object, we just want to concatenated date string
        if (todo[camelCaseName] instanceof Date) {
            content.innerText = todo[camelCaseName].toLocaleDateString();
        } else {
            content.innerText = todo[camelCaseName];
        }    
        element.appendChild(label);
        element.appendChild(content);
        element.appendChild(editIcon);
        element.appendChild(saveEdit);
        todoDiv.appendChild(element);

        //eventlistener for edit icon
        editIcon.addEventListener('click', (e)=> {
            editIcon.classList.toggle('hidden');
            saveEdit.classList.toggle('hidden');

            //move label upwards slightly
            e.target.parentElement.firstChild.classList.toggle('up8px');

            e.target.previousSibling.setAttribute('contenteditable', 'true');
            e.target.previousSibling.style.border = '3px var(--main-blue) solid';
            e.target.previousSibling.focus();

            //eventlistener for enter and esc keyup
            e.target.previousSibling.addEventListener('keydown', (keyEvt)=> {
                if (keyEvt.key === 'Enter') {
                    e.target.nextSibling.click()
                }
            })
        })

        //eventlistener for save edit button
        saveEdit.addEventListener('click', (e)=> {
            e.target.previousSibling.previousSibling.setAttribute('contenteditable', 'false');
            e.target.previousSibling.previousSibling.style.border = 'none';
            
            // move label back down
            e.target.parentElement.firstChild.classList.toggle('up8px');

            // save changes to gyh.[projects]
            const projTitle = e.target.parentElement.parentElement.parentElement.previousSibling.innerText;
            const todoObjKey = e.target.parentElement.firstChild.innerText;
            const todoObjKeyCamelCase = todoObjKey[0].toLowerCase() + todoObjKey.slice(1);
            const indexNum = countIndexNum(e);

            gyh.projects[projTitle].todoArray[indexNum][todoObjKeyCamelCase] = e.target.previousSibling.previousSibling.innerText;

            editIcon.classList.toggle('hidden');
            saveEdit.classList.toggle('hidden');

            // refreshes todoDivShort
            e.target.parentElement.parentElement.previousSibling.remove();
            const newTodoDivShort = createTodoDivShort(gyh.projects[projTitle].todoArray[indexNum]);
            newTodoDivShort.classList.add('hidden');
            e.target.parentElement.parentElement.parentElement.insertBefore(newTodoDivShort, e.target.parentElement.parentElement);

            // refreshes todoDivDetailed
            const newTodoDivDetailed = createTodoDivDetailed(gyh.projects[projTitle].todoArray[indexNum]);
            newTodoDivDetailed.classList.remove('hidden');
            e.target.parentElement.parentElement.parentElement.insertBefore(newTodoDivDetailed, e.target.parentElement.parentElement.nextSibling);
            e.target.parentElement.parentElement.remove();
            console.log(gyh);
        })
    })

    // add class according to priority
    if (todo.priority === 'High') {
        todoDiv.classList.add('highPriority');
    } else if (todo.priority === 'Medium') {
        todoDiv.classList.add('mediumPriority');
   } else if (todo.priority === 'Low'){
        todoDiv.classList.add('lowPriority');
    }
    minimizeBtn.addEventListener('click', hideDetails);
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
    return result
}

// helper function to determine the index number of the todo under a project based on click event of save edit button
function countIndexNum(clickEvent) {
    let todoDiv = clickEvent.target.parentElement.parentElement;
    let count = 0;
    // once we reach the first sibling, previousSibling will return null
    while (todoDiv.previousSibling !== null) { 
        todoDiv = todoDiv.previousSibling;
        count+=1;
    }
    // we have twice the number of todoDivs compared to number of todos
    // (todoDiv and todoDivDetailed)
    // also indexing starts from zero, thus we use floor instead of ceiling function
    // in fact count will almost always be odd, since the save edit button can only be found on odd todoDivs
    return Math.floor(count/2);  
}
