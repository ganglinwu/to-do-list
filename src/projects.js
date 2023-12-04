export default class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.todoArray = [];
    }

    addTask(todoObj) {
        this.todoArray.push(todoObj);
    }

    removeTask(todoObj) {
        if (this.tasks.some(todoObj)) {
            const index = this.tasks.indexOf(todoObj);
            this.tasks.splice(index, 1);
        }
    }
}
