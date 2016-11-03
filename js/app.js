// Module
var myApp = angular.module('myApp', ['ngRoute', 'ngResource']);

//ROUTES
myApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: "pages/home.html",
    }).when('/records', {
        templateUrl: "pages/records.html",
        controller: "recordController"
    }).when('/profile', {
        templateUrl: "pages/profile.html",
        controller: "recordController"
    }).when('/matchBymatch', {
        templateUrl: "pages/matchBymatch.html",
        controller: "recordController"
    });
}]);

//CONTROLLERS
myApp.controller("recordController", ['$scope', '$resource','$http', function($scope, $resource, $http) {
    $scope.crickApi = $resource('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20cricket.player.profile%20where%20player_id%3D2962&format=json&env=store%3A%2F%2F0TxIGQMQbObzvU4Apia0V0', {
        callback: 'JSON_CALLBACK'
    }, {
        get: {
            method: 'JSONP'
        }
    });
    $scope.crickResults = $scope.crickApi.get({});

    $scope.fullname = function(fn, ln) {
        return fn + " " + ln;
    };

    $scope.convertDate = function(dt) {
        return new Date(dt);
    };

    $http.get('js/data.js').success(function(result){
             $scope.match = result;
             console.log($scope.match);
    }).error(function(data, status){
        console.log(data);
    });
    
}]);