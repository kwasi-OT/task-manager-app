// declare angular module
var app = angular.module('taskApp', []);

app.controller('MainController', function ($scope, $http) {
    $scope.tasks = [];
    $scope.newTask = {};
    $scope.editing = false;
    $scope.editTaskData = {};

    // Function to load tasks from API
    function loadTasks() {
        $http.get('https://task-manager-api-kwasi-ot.vercel.app/tasks')
            .then(function (response) {
                $scope.tasks = response.data;
            })
            .catch(function (error) {
                console.error('Error loading tasks:', error);
            });
    }

    loadTasks();

    // Function to add a new task
    $scope.addTask = function () {
        $http.post('https://task-manager-api-kwasi-ot.vercel.app/tasks', $scope.newTask)
            .then(function () {
                loadTasks();
                $scope.newTask = {};
            })
            .catch(function (error) {
                console.error('Error adding task:', error);
            });
    };

    // Function to edit a task
    $scope.editTask = function (task) {
        $scope.editing = true;
        $scope.editTaskData = angular.copy(task);
    };

    // Function to save edited task
    $scope.saveTask = function () {
        $http.put('https://task-manager-api-kwasi-ot.vercel.app/tasks/' + $scope.editTaskData.id, $scope.editTaskData)
            .then(function () {
                loadTasks();
                $scope.editTaskData = {};
                $scope.editing = false;
            })
            .catch(function (error) {
                console.error('Error editing task:', error);
            });
    };

    // Function to delete a task
    $scope.deleteTask = function (task) {
        $http.delete('https://task-manager-api-kwasi-ot.vercel.app/tasks/' + task.id)
            .then(function () {
                loadTasks();
            })
            .catch(function (error) {
                console.error('Error deleting task:', error);
            });
    };

    // Function to toggle task completion
    $scope.toggleCompletion = function (task) {
        task.completed = !task.completed;
        $http.put('https://task-manager-api-kwasi-ot.vercel.app/tasks/' + task.id + '/completed', task)
            .catch(function (error) {
                console.error('Error toggling completion:', error);
            });
    };
});