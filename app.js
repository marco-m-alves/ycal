var app = angular.module('app', ['ycal']);

app.controller('Ctrl', function($scope){

	
	$scope.rules = {
           "all": {
             "all": {
               "all": {
                 "0,6": "custom_rule"
               }
             }
           }
         };

    $scope.styles = {
    	'custom_rule': 'redtext'
    };


	$scope.onSelectionChange = function(dates){
		console.log(dates);
		$scope.selectedDates = dates;
	};


	$scope.$watch('selectedWeekdays', function () {

		if (!$scope.selectedWeekdays) return;

		var _weekdays = $scope.selectedWeekdays.join(',');

		console.log("0,6", _weekdays);

		var rules = {
           "all": {
             "all": {
               "all": {
                 // weekdays will be inserted here
               }
             }
           }
         };

		rules.all.all.all[_weekdays] = "custom_rule";

         $scope.rules = rules;
	}, true);

});

app.directive('weekdaySelect', function(){
  return {
    restrict: 'E',
    scope: { selectedWeekdays: '=', selectedOrdinals: '=', showOrdinals: '=' },
    template: '<div ng-show="showOrdinals"><span ng-repeat="ordinal in ordinals" style="margin-right: 10px;"><input class="margin-reset" type="checkbox" ng-model="ordinal.selected" ng-change="updateSelection()">&nbsp;{{ordinal.name}}</span></div><span ng-repeat="weekday in weekdays" style="margin-right: 10px;"><input type="checkbox" ng-model="weekday.selected" ng-change="updateSelection()">&nbsp;{{weekday.name}}</span>',
    link: function( scope, element) {
      // var weekdays = [
      //   { name: 'Dom', value: 'Sunday' },
      //   { name: 'Seg', value: 'Monday' },
      //   { name: 'Ter', value: 'Tuesday' },
      //   { name: 'Qua', value: 'Wednesday' },
      //   { name: 'Qui', value: 'Thursday' },
      //   { name: 'Sex', value: 'Friday' },
      //   { name: 'Sáb', value: 'Saturday' }
      // ];

      var weekdays = [
        { name: 'Dom', value: 0 },
        { name: 'Seg', value: 1 },
        { name: 'Ter', value: 2 },
        { name: 'Qua', value: 3 },
        { name: 'Qui', value: 4 },
        { name: 'Sex', value: 5 },
        { name: 'Sáb', value: 6 }
      ];
      
      scope.weekdays = weekdays;
      
      var ordinals = [
        { name: '1º', value: 'first' },
        { name: '2º', value: 'second' },
        { name: '3º', value: 'third' },
        { name: '4º', value: 'forth' },
        { name: 'Último', value: 'last' }
      ];
      
      scope.ordinals = ordinals;
      
      
      var deselectAllWeekdays = function(){
        weekdays.forEach(function(weekday){
          if (weekday) weekday.selected = false;
        });
      };
      
      var selectWeekdayByValue = function(value){
        console.log('select weekday by value', value);
        if (!value) return;
        weekdays.forEach(function(weekday){
          if (weekday && weekday.value === value) weekday.selected = true;
        });
      };
      
      var selectWeekdaysByValues = function(values){
        console.log('select weekdays by values', values);
        if (!values) return;
        values.forEach(function(value){
          selectWeekdayByValue(value);
        });
      };
      
      var deselectAllOrdinals = function(){
        ordinals.forEach(function(ordinal){
          if (ordinal) ordinal.selected = false;
        });
      };
      
      var selectOrdinalByValue = function(value){
        console.log('select ordinal by value', value);
        if (!value) return;
        ordinals.forEach(function(weekday){
          if (ordinal && ordinal.value === value) ordinal.selected = true;
        });
      };
      
      var selectOrdinalsByValues = function(values){
        console.log('select weekdays by values', values);
        if (!values) return;
        values.forEach(function(value){
          selectOrdinalByValue(value);
        });
      };
      
      scope.updateSelection = function(){
        scope.selectedWeekdays = scope.weekdays.filter(function(weekday){
          return weekday.selected;
        }).map(function (weekday) {
        	return weekday.value;
        });
        
        scope.selection = scope.ordinals.filter(function(ordinal){
          return ordinal.selected;
        }).map(function (weekday) {
        	return weekday.value;
        });
      };
      
      scope.$watch('selectedWeekdays', function(){
        var selectedWeekdays = scope.selectedWeekdays;
        deselectAllWeekdays();
        if (selectedWeekdays) selectWeekdaysByValues(selectedWeekdays);
      }, true);
      
      scope.$watch('selectedOrdinals', function(){
        var selectedOrdinals = scope.selectedOrdinals;
        deselectAllOrdinals();
        if (selectedOrdinals) selectOrdinalsByValues(selectedOrdinals);
      }, true);
    }
  };
});