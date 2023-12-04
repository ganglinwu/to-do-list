export default class Todo  {
    constructor(name, description, dueDate, todoDuration, completed) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.todoDuration = todoDuration;
        this.completed = completed;
    }

    toggleTodoComplete() {
        if (this.completed) {
            this.completed = false;
        } else {
            this.completed = true;
        }
    }
}
