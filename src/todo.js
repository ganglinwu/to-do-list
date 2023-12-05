export default class Todo  {
    constructor(name, description, dueDate, todoDuration, completed, priority, checklistRequired) {
        this.name = name;
        this.description = description;
        this.dueDate = dueDate;
        this.todoDuration = todoDuration;
        this.completed = completed;
        this.priority = priority;
        this.checklistRequired = checklistRequired;
        this.checklist = [];
    }

    toggleTodoComplete() {
        if (this.completed) {
            this.completed = false;
        } else {
            this.completed = true;
        }
    }
}
