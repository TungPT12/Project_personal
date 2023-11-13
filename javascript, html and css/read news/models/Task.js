'use strict'
class Task {
    #task;
    #owner
    #isDone
    constructor(task, owner, isDone) {
        this.#task = task;
        this.#owner = owner;
        this.#isDone = isDone;
    }

    /**
     * @param {any} task
     */
    set setTask(task) {
        this.#task = task;
    }

    get getTask() {
        return this.#task;
    }

    /**
     * @param {any} owner
     */
    set setOwner(owner) {
        this.#owner = owner;
    }

    get getOwner() {
        return this.#owner;
    }

    /**
     * @param {any} isDone
     */
    set setIsDone(isDone) {
        this.#isDone = isDone;
    }

    get getIsDone() {
        return this.#isDone;
    }
}
