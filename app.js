var app = angular.module('app', ['ycal']);

app.controller('Ctrl', function($scope){

	
	$scope.rules = {
           "all": {
             "all": {
               "all": {
                 "0,6": "all_weekends"
               }
             }
           }
         };

    $scope.styles = {
    	'all_weekends': 'redtext'
    };


	$scope.onSelectionChange = function(dates){
		console.log(dates);
		$scope.selectedDates = dates;
	};


});