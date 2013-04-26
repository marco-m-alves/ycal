var app = angular.module('app', ['ycal']);

app.controller('Ctrl', function($scope){
  $scope.onSelectionChange = function(dates){
    console.log(dates);
    $scope.selectedDates = dates;
  };
});