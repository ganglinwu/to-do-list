export default class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.todoArray = [];
    }

    // there will no be any addTpdp method
    // becuase it is simple a push into this.todoArray
    // you will have to manually call isTodoDuplicate to check for dupes
    // before pushing into Array
    
    removeTodo(todoObj) { 
        if (this.todoArray.some(todo => _.isEqual(todo, todoObj))) { 
            const index = this.todoArray.indexOf(todoObj);
            this.todoArray.splice(index, 1);
        }
    }

    // helper function to check if todo alrady exist in todoArray
    isTodoDuplicate(todoObj) {
        if (this._isNameSame(todoObj) && this._isDueDateSame(todoObj)) {
            return true;
        } else return false;
    }

    // helper function to match todoObj by name 
    _isNameSame(todoObj) {
        if (this.todoArray.some(todo => todo.name === todoObj.name)) {
            return true;
        } else return false;
    }

    // helper function to match todoObj by dueDate
    _isDueDateSame(todoObj) {
        if (this.todoArray.some(todo => todo.dueDate === todoObj.dueDate)) {
            return true;
        } else return false;
    }
}
