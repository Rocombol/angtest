angular.module('main', []).config(function($routeProvider) {
    $routeProvider
        .when('/', {
            controller:'TableController', 
            templateUrl:'./templates/edit.html'
        })
        .when('/details/:taskID', {
            controller:'DetailsController', 
            templateUrl:'./templates/details.html'
        });
});

function TableController ($scope) {
    $scope.participant = participantJSON;
    
    $scope.participant.getActive = function () {
        var res = [];
        this.forEach(function (item) {
            res.push(item);
        });
        return res;
    };
}

function DetailsController ($scope, $routeParams, $http) {
    
    $scope.participant = participantJSON.find(function (item) {
        return item.id == $routeParams.taskID;
    });
    
}

