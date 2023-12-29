import createEle from './createEle.js';
import { revealDetails, hideDetails } from './revealdetails.js';
import { gyh } from './index.js';
import { refreshTodoList } from './loadtodo.js';

import editIconSrc from './img/icons8-edit-26.png'

export function createTodoDivShort(todo) {
    const todoDiv = createEle('div', 'class', 'todoDiv');
    const todoTitle = createEle('div', 'class', 'todoTitle');
    const dueDateIconWrapper= createEle('div', 'class', 'dueDateIconWrapper');
    const dueDateDiv = createEle('div', 'class', 'dueDateDiv');
    const checkbox = createEle('input','type','checkbox');
    checkbox.classList.add('checkbox');

    if (todo.name.length < 18) {
        todoTitle.innerText = todo.name;
    } else {
        const shortenedtodoName = todo.name.slice(0,18);
        todoTitle.innerText = shortenedtodoName;
    }   
    todoDiv.appendChild(checkbox);
    todoDiv.appendChild(todoTitle);
    todoDiv.appendChild(dueDateIconWrapper);

    dueDateDiv.innerText = todo.dueDate.toLocaleDateString(); 
    dueDateIconWrapper.appendChild(dueDateDiv);
    
    // add class according to priority
    if (todo.priority === 'High') {
        todoDiv.classList.add('highPriority');
    } else if (todo.priority === 'Medium') {
        todoDiv.classList.add('mediumPriority');
   } else if (todo.priority === 'Low'){
        todoDiv.classList.add('lowPriority');
    }

    // if todo is completed add class to strikethrough text
    if (todo.completed === true) {
        todoDiv.classList.add('completed');
        checkbox.checked = true;
    }
    todoDiv.addEventListener('click', revealDetails); 
    checkbox.addEventListener('click', (e)=> {
        todo.toggleTodoComplete();
        const projTitle = e.target.parentElement.parentElement.previousSibling.firstChild.innerText;
        refreshTodoList(gyh.projects[projTitle]);
        e.stopPropagation();
    })
    return todoDiv;
}

export function createTodoDivDetailed(todo){
    const todoDiv = createEle('div', 'class', 'todoDivDetailed');
    todoDiv.classList.add('hidden');
    const checkbox = createEle('input','type','checkbox');
    checkbox.classList.add('checkbox');
    
    todoDiv.appendChild(checkbox);
    
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
    const todoDivDetailedPriority = createEle('div', 'class', 'todoDivDetailedPriority');
    
    const todoDivDetailsArr = [todoDivDetailedName, todoDivDetailedDescription, todoDivDetailedDueDate, todoDivDetailedDuration, todoDivDetailedPriority] 
    
    todoDivDetailsArr.forEach(element=> {
        // obtained key by slicing the first 15 characters
        // i.e. todoDivDetailedDueDate => DueDate
        // capitalizedName is in UpperCamelCase
        const capitalizedName = element.classList[0].slice(15);

        // lowercase only the first letter 
        // e.g. Name => name , DueDate => dueDate
        const camelCaseName = capitalizedName[0].toLowerCase() + capitalizedName.slice(1);

        // our label must be in proper english
        // we use a helper function to turn DueDate => Due Date
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

        // initialze cancel edit button
        const cancelEdit = createEle('button', 'type', 'button');
        cancelEdit.classList.add('cancelEdit');
        cancelEdit.classList.add('hidden');
        cancelEdit.innerText = 'Cancel'

        // initialize divs
        const label = createEle('div', 'class', 'todoLabel');
        label.innerText = labelName;
        const content = createEle('div', 'class', 'content');
        content.setAttribute('contenteditable', 'false');

        // add completed class if completed
        if (todo.completed === true) {
            content.classList.add('completed');
            checkbox.checked = true;
        }

        // check if Date object, we just want to concatenated date string
        if (todo[camelCaseName] instanceof Date) {
            content.innerText = todo[camelCaseName].toLocaleDateString();
        } else if (todo[camelCaseName]=== undefined) {
            content.innerText = ''
        } else {
            content.innerText = todo[camelCaseName];
        }    
        element.appendChild(label);
        element.appendChild(content);
        element.appendChild(editIcon);
        element.appendChild(saveEdit);
        element.appendChild(cancelEdit);
        todoDiv.appendChild(element);

        //eventlistener for edit icon
        editIcon.addEventListener('click', (e)=> {
            editIcon.classList.toggle('hidden');
            saveEdit.classList.toggle('hidden');
            cancelEdit.classList.toggle('hidden');

            const selectorInput = createEle('select', 'id', 'editPriority');
            //move label upwards slightly
            e.target.parentElement.firstChild.classList.toggle('up8px');

            if (e.target.parentElement.firstChild.innerText === 'Priority') {
                e.target.previousSibling.innerText = '';
                const highP = createEle('option', 'value', 'High');
                const mediumP = createEle('option', 'value', 'Medium');
                const lowP = createEle('option', 'value', 'Low');
                [highP, mediumP, lowP].forEach(element => {
                    element.innerText = element.value;
                    selectorInput.appendChild(element); 
                });
                e.target.parentElement.insertBefore(selectorInput,e.target.previousSibling);
            } else {
                e.target.previousSibling.setAttribute('contenteditable', 'true');
                e.target.previousSibling.style.border = '3px var(--main-blue) solid';
                e.target.previousSibling.focus();
            }

            //eventlistener for enter and esc keyup
            e.target.previousSibling.addEventListener('keydown', (keyEvt)=> {
                if (keyEvt.key === 'Enter') {
                    e.target.nextSibling.click();
                } else if (keyEvt.key === 'Escape') {
                    e.target.nextSibling.nextSibling.click();
                }
            })

            //eventlistener for enter and esc keyup when input selector is focused
            selectorInput.addEventListener('keydown', (keyEvt)=> {
                if (keyEvt.key === 'Enter') {
                    e.target.nextSibling.click();
                } else if (keyEvt.key === 'Escape') {
                    e.target.nextSibling.nextSibling.click();
                }
            })
        })

        //eventlistener for save edit button
        saveEdit.addEventListener('click', (e)=> {
            const todoValue = e.target.previousSibling.previousSibling;
            todoValue.setAttribute('contenteditable', 'false');
            todoValue.style.border = 'none';
            
            // move label back down
            const todoKey = e.target.parentElement.firstChild;
            todoKey.classList.toggle('up8px');

            // save changes to gyh.[projects]
            const projTitle = e.target.parentElement.parentElement.parentElement.previousSibling.innerText;
            const todoObjKey = todoKey.innerText.replace(/\s+/g, '');
            const todoObjKeyCamelCase = todoObjKey[0].toLowerCase() + todoObjKey.slice(1);
            const indexNum = countIndexNum(e);

            // save new todo value
            if (todoKey.innerText === 'Due Date') {
                const dateStringArr = todoValue.innerText.split('/');
                gyh.projects[projTitle].todoArray[indexNum]['dueDate'] = new Date(Number(dateStringArr[2]), Number(dateStringArr[1])-1, Number(dateStringArr[0]));
            } else if (todoKey.innerText === 'Priority') {
                const selector = document.getElementById('editPriority');
                gyh.projects[projTitle].todoArray[indexNum]['priority'] = selector.value;
                selector.nextSibling.classList.toggle('hidden');
                selector.remove();
            } else {
                gyh.projects[projTitle].todoArray[indexNum][todoObjKeyCamelCase] = todoValue.innerText;
            }

            editIcon.classList.toggle('hidden');
            saveEdit.classList.toggle('hidden');
            cancelEdit.classList.toggle('hidden');

            // refreshes todoDivShort
            const todoDivDetailed = e.target.parentElement.parentElement;
            const todoDivShort = todoDivDetailed.previousSibling;
            todoDivShort.remove();
            const newTodoDivShort = createTodoDivShort(gyh.projects[projTitle].todoArray[indexNum]);
            newTodoDivShort.classList.add('hidden');
            todoDivDetailed.parentElement.insertBefore(newTodoDivShort, todoDivDetailed);

            // refreshes todoDivDetailed
            const newTodoDivDetailed = createTodoDivDetailed(gyh.projects[projTitle].todoArray[indexNum]);
            newTodoDivDetailed.classList.remove('hidden');
            todoDivDetailed.parentElement.insertBefore(newTodoDivDetailed, todoDivDetailed.nextSibling);
            todoDivDetailed.remove();
        })

        //eventlistener for cancel edit button
        cancelEdit.addEventListener('click', (e)=> {
            const todoValue = e.target.previousSibling.previousSibling.previousSibling;
            todoValue.setAttribute('contenteditable', 'false');
            todoValue.style.border = 'none';
            
            // move label back down
            const todoKey = e.target.parentElement.firstChild;
            todoKey.classList.toggle('up8px');

            // cancel changes to gyh.[projects]
            const projTitle = e.target.parentElement.parentElement.parentElement.previousSibling.innerText;
            const todoObjKey = todoKey.innerText.replace(/\s+/g, "");
            const todoObjKeyCamelCase = todoObjKey[0].toLowerCase() + todoObjKey.slice(1);
            const indexNum = countIndexNum(e);

            // cancel new todo value
            if (todoKey.innerText === 'Due Date') {
                todoValue.innerText = gyh.projects[projTitle].todoArray[indexNum]['dueDate'].toLocaleDateString();
                ;
            } else if (todoKey.innerText = 'Priority') {
                const selector = document.getElementById('editPriority');
                selector.remove()
                todoValue.innerText = gyh.projects[projTitle].todoArray[indexNum][todoObjKeyCamelCase];
            } else {
                todoValue.innerText = gyh.projects[projTitle].todoArray[indexNum][todoObjKeyCamelCase];
            }

            editIcon.classList.toggle('hidden');
            saveEdit.classList.toggle('hidden');
            cancelEdit.classList.toggle('hidden');
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

    // eventlistener for checkbox
    checkbox.addEventListener('click', (e)=> {
        todo.toggleTodoComplete();
        const todoDivDetailed = e.target.parentElement;
        const newTodoDivDetailed = createTodoDivDetailed(todo);
        newTodoDivDetailed.classList.remove('hidden');
        todoDivDetailed.parentElement.insertBefore(newTodoDivDetailed, todoDivDetailed);
        todoDivDetailed.remove()
    })

    // eventlistener for minimize button
    minimizeBtn.addEventListener('click', hideDetails);
    return todoDiv
}

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
