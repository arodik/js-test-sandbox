import TodoItem from '../models/TodoItem';

export default function () {
    var todoList = this;

    this.routes = {
        ALL_TODOS: 1,
        ARCHIVED_TODOS: 2
    };
    this.newTodoTitle = "";
    this.displayTodos = [];

    this.todos = [
        new TodoItem("task 1"),
        new TodoItem("task 2")
    ];

    this.archivedTodos = [
        new TodoItem("Archived task 1", true)
    ];

    this.displayTodos = this.todos;
    this.currentRoute = this.routes.ALL_TODOS;

    this.addTodo = function () {
        var newTitle = this.newTodoTitle.trim();
        if (newTitle) {
            this.todos.push(new TodoItem(newTitle));
            this.newTodoTitle = "";
        }
    };

    this.remainingCount = function () {
        return this.todos.reduce(function(acc, item) {
            if (!item.done) acc++;
            return acc;
        }, 0);
    };

    this.showArchived = function () {
        this.displayTodos = this.archivedTodos;
        this.currentRoute = this.routes.ARCHIVED_TODOS;
    };

    this.showCurrent = function () {
        this.displayTodos = this.todos;
        this.currentRoute = this.routes.ALL_TODOS;
    };

    this.moveToArchive = function () {
        var newTodos = [];

        this.todos.forEach(function(todo) {
            if (todo.done) {
                todoList.archivedTodos.push(todo);
            } else {
                newTodos.push(todo);
            }
        });

        this.todos = newTodos;
        this.showCurrent();
    };
};
