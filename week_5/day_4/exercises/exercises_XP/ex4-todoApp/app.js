// ES module
import { TodoList } from "./todo.js";

const todos = new TodoList();
todos.add("Apprendre Node.js");
todos.add("Coder un converter");
todos.add("Réviser les modules");

todos.complete("Coder un converter");

console.log("Toutes les tâches:");
for (const t of todos.list()) {
  console.log(`${t.done ? '✔' : '✖'} ${t.title}`);
}
