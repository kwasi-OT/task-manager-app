// declare angular module
var app = angular.module('taskApp', []);

app.controller(MainController, function ($scope, $http) {
    $scope.tasks = [];
    $scope.newTask = {};
    $scope.editing = false;
    $scope.editTaskData = {};

    // Function to load tasks from API
    function loadTasks() {
        $http.get('http://api-url/tasks')
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
        $http.post('http://api-url/tasks', $scope.newTask)
            .then(function () {
                loadTasks();
                $scope.newTask = {};
            })
            .catch(function (error) {
                console.error('Error adding task:', error);
            });
    };

    
});