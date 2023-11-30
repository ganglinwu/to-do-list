export default class Project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.tasks = [];
    }

    addTask(taskObj) {
        this.tasks.push(taskObj);
    }

    removeTask(taskObj) {
        if (this.tasks.some(taskObj)) {
            const index = this.tasks.indexOf(taskObj);
            this.tasks.splice(index, 1);
        }
    }
}
