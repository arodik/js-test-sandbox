(function (angular) {
    var TodoItem = function (name, completed) {
        this.title = name;
        this.done = Boolean(completed);
    };

    var TodoController = function ($scope) {
        $scope.routes = {
            ALL_TODOS: 1,
            ARCHIVED_TODOS: 2
        };
        $scope.newTodoTitle = "";
        $scope.displayTodos = [];

        $scope.todos = [
            new TodoItem("task 1"),
            new TodoItem("task 2")
        ];

        $scope.archivedTodos = [
            new TodoItem("Archived task 1", true)
        ];

        $scope.displayTodos = $scope.todos;
        $scope.currentRoute = $scope.routes.ALL_TODOS;

        $scope.addTodo = function () {
            var newTitle = $scope.newTodoTitle.trim();
            if (newTitle) {
                $scope.todos.push(new TodoItem(newTitle));
                $scope.newTodoTitle = "";
            }
        };

        $scope.remainingCount = function () {
           return $scope.todos.reduce(function(acc, item) {
               if (item.done) acc++;
               return acc;
           }, 0);
        };

        $scope.showArchived = function () {
            $scope.displayTodos = $scope.archivedTodos;
            $scope.currentRoute = $scope.routes.ARCHIVED_TODOS;
        };

        $scope.showCurrent = function () {
            $scope.displayTodos = $scope.todos;
            $scope.currentRoute = $scope.routes.ALL_TODOS;
        };

        $scope.moveToArchive = function () {
            var newTodos = [];

            $scope.todos.forEach(function(todo) {
                if (todo.done) {
                    $scope.archivedTodos.push(todo);
                } else {
                    newTodos.push(todo);
                }
            });

            $scope.todos = newTodos;
            $scope.showCurrent();
        };
    };

    angular.module('todolist', [])
        .controller('TodoController', ['$scope', TodoController]);

})(angular);
