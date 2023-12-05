export default class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.todoArray = [];
    }

    addTodo(todoObj) {
        // first check if duplicate todo already exist
        // we check two things, the todo name and dueDate 
        this._isTodoDuplicate(todoObj) ? alert('A todo with the same name and due date is already in this Project. Please check again.') : this.todoArray.push(todoObj);
    }

    removeTodo(todoObj) {
        if (this.todoArray.some(todoObj)) {
            const index = this.todoArray.indexOf(todoObj);
            this.todoArray.splice(index, 1);
        }
    }

    // helper function to check if todo alrady exist in todoArray
    _isTodoDuplicate(todoObj) {
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
