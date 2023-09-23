// declare angular module
var app = angular.module('taskApp', []);

app.controller('MainController', function ($scope, $http) {
    $scope.tasks = [];
    $scope.newTask = {};
    $scope.editing = false;
    $scope.editTaskData = {};

    // Function to load tasks from API
    function loadTasks() {
        $http.get('https://taskmanager.iamkwasi.dev/tasks.php/')
            .then(function (response) {
                $scope.tasks = response.data;
                console.log($scope.tasks);
            })
            .catch(function (error) {
                console.error('Error loading tasks:', error);
            });
    }

    loadTasks();

    // Function to add a new task
    $scope.addTask = function () {
        $http.post('https://taskmanager.iamkwasi.dev/tasks.php', $scope.newTask)
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
        console.log('Edit task:', task);
        $scope.editing = true;
        $scope.editTaskData = angular.copy(task);
    };

    // Function to save edited task
    $scope.saveTask = function () {
        $http.put('https://taskmanager.iamkwasi.dev/tasks.php', $scope.editTaskData)
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
        $http.delete('https://taskmanager.iamkwasi.dev/tasks.php?id=' + task.id)
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
        $http.put('https://taskmanager.iamkwasi.dev/tasks.php', task)
            .catch(function (error) {
                console.error('Error toggling completion:', error);
            });
    };

     // Custom filter function
    $scope.customFilter = function (task) {
        // If filterCompleted is true, show completed tasks; if false, show all tasks
        return $scope.filterCompleted ? !task.completed : true;
    };
});


//     // Function to load tasks from API
//     function loadTasks() {
//         $http.get('https://task-manager-api-kwasi-ot.vercel.app/tasks')
//             .then(function (response) {
//                 $scope.tasks = response.data;
//             })
//             .catch(function (error) {
//                 console.error('Error loading tasks:', error);
//             });
//     }

//     loadTasks();

//     // Function to add a new task
//     $scope.addTask = function () {
//         $http.post('https://task-manager-api-kwasi-ot.vercel.app/tasks', $scope.newTask)
//             .then(function () {
//                 loadTasks();
//                 $scope.newTask = {};
//             })
//             .catch(function (error) {
//                 console.error('Error adding task:', error);
//             });
//     };

//     // Function to edit a task
//     $scope.editTask = function (task) {
//         console.log('Edit task:', task);
//         $scope.editing = true;
//         $scope.editTaskData = angular.copy(task);
//     };

//     // Function to save edited task
//     $scope.saveTask = function () {
//         $http.put('https://task-manager-api-kwasi-ot.vercel.app/tasks/' + $scope.editTaskData.id, $scope.editTaskData)
//             .then(function () {
//                 loadTasks();
//                 $scope.editTaskData = {};
//                 $scope.editing = false;
//             })
//             .catch(function (error) {
//                 console.error('Error editing task:', error);
//             });
//     };

//     // Function to delete a task
//     $scope.deleteTask = function (task) {
//         $http.delete('https://task-manager-api-kwasi-ot.vercel.app/tasks/' + task.id)
//             .then(function () {
//                 loadTasks();
//             })
//             .catch(function (error) {
//                 console.error('Error deleting task:', error);
//             });
//     };

//     // Function to toggle task completion
//     $scope.toggleCompletion = function (task) {
//         task.completed = !task.completed;
//         $http.put('https://task-manager-api-kwasi-ot.vercel.app/tasks/' + task.id + '/completed', task)
//             .catch(function (error) {
//                 console.error('Error toggling completion:', error);
//             });
//     };
// });