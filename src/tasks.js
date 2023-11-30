export default class Task  {
    constructor(name, description, dueDate, taskDuration, completed) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.taskDuration = taskDuration;
        this.completed = completed;
    }

    toggleTaskComplete() {
        if (this.completed) {
            this.completed = false;
        } else {
            this.completed = true;
        }
    }
}
