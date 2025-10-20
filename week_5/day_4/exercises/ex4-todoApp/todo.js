// ES module
export class TodoList {
  #tasks = []; // { title, done }

  add(title) {
    this.#tasks.push({ title, done: false });
  }
  complete(title) {
    const t = this.#tasks.find(x => x.title === title);
    if (t) t.done = true;
  }
  list() {
    return this.#tasks.slice();
  }
}
