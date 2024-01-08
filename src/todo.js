export default class Todo {
    constructor(
        projectTitle,
        name,
        description,
        dueDate,
        duration,
        completed,
        priority
    ) {
        this.projectTitle = projectTitle;
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.duration = duration;
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
