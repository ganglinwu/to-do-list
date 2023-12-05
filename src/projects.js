export default class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.todoArray = [];
    }

    addTodo(todoObj) {
        // first check if duplicate todo already exist
        // we check two things, the todo name and dueDate 
        _isTodoDuplicate(todoObj) ? alert('A todo with the same name and due date is already in this Project. Please check again.') : this.todoArray.push(todoObj);
    }

    removeTodo(todoObj) {
        if (this.todoArray.some(todoObj)) {
            const index = this.todoArray.indexOf(todoObj);
            this.todoArray.splice(index, 1);
        }
    }

    // helper function to check if todo alrady exist in todoArray
    _isTodoDuplicate(todoObj) {
        if (this.todoArray.some(todoObj)) {
            return true;
        } else return false;
    }
}
