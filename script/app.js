var app = angular.module("ToDoApp",['ngRoute'])
.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl: "index.html",
        controller: "todoCtrl"
    }).when('/index',{
        templateUrl: "index.html",
        controller: "todoCtrl"
    })
});