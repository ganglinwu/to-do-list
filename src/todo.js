export default class Todo  {
    constructor(name, description, dueDate, todoDuration, completed, priority) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.todoDuration = todoDuration;
        this.completed = completed;
        this.priority = priority;
    }

    toggleTodoComplete() {
        if (this.completed) {
            this.completed = false;
        } else {
            this.completed = true;
        }
    }
}
