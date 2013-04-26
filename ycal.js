angular.module('ycal', [] ).
directive('ycalendar', function ( FullYearTemplate ) {
  return {
    restrict: 'E',
    scope: { year: '=', onSelectionChange: '&' },
    template: '<div class="content-box"></div>',
    link: function (scope, element) {
      
      
      // Style the calendar
      $(element).addClass('yui3-skin-sam');
      
      
      
      YUI().use('calendar', 'datatype-date', 'datatype-date-math', function(Y) {

        // Set the default value for the year as the current year
        var currentYear = new Date().getFullYear();
        
     // Switch the calendar main template to the included two pane template
     Y.CalendarBase.CONTENT_TEMPLATE = FullYearTemplate;

     // Create a new instance of calendar, setting the showing of previous
     // and next month's dates to true, and the selection mode to multiple
     // selected dates. Additionally, set the disabledDatesRule to a name of
     // the rule which, when matched, will force the date to be excluded
     // from being selected. Also configure the initial date on the calendar
     // to be July of 2011.
     var calendar = new Y.Calendar({
       contentBox: $(element).find('.content-box')[0],
       width: "100%",
       showPrevMonth: true,
       showNextMonth: true,
       selectionMode: 'multiple-sticky',
       date: new Date(currentYear, 0, 1)
     }).render();
            
      scope.calendar = calendar;
        
      // Make change to year parameter reflected
      // on the calendar date range
      scope.$watch('year', function(){
        var year = scope.year;
        //console.log('changed year', year);
        if (year && calendar) {
          //console.log('setting date', year);
          calendar.set('date', new Date(year, 0, 1));
        }
      }, true);

      // Create a set of rules to match specific dates. In this case,
      // the "tuesdays_and_fridays" rule will match any Tuesday or Friday,
      // whereas the "all_weekends" rule will match any Saturday or Sunday.
       var rules = {
         "all": {
           "all": {
             "all": {
               "0,6": "all_weekends"
             }
           }
         }
       };

      // Set the calendar customRenderer, provides the rules defined above,
      // as well as a filter function. The filter function receives a reference
      // to the node corresponding to the DOM element of the date that matched
      // one or more rule, along with the list of rules. Check if one of the
      // rules is "all_weekends", and if so, apply a custom CSS class to the
      // node.
       calendar.set("customRenderer", {
         rules: rules,
         filterFunction: function (date, node, rules) {
           if (Y.Array.indexOf(rules, 'all_weekends') >= 0) {
             node.addClass("redtext");
           }
         }
       });

        // Set a custom header renderer with a callback function,
        // which receives the current date and outputs a string.
        // use the Y.Datatype.Date format to format the date, and
        // the Datatype.Date math to add one month to the current
        // date, so both months can appear in the header (since 
        // this is a two-pane calendar).
         calendar.set("headerRenderer", function (curDate) {
           var ydate = Y.DataType.Date,
               output = ydate.format(curDate, {
               format: "%B %Y"
             }) + " &mdash; " + ydate.format(ydate.addMonths(curDate, 11), {
               format: "%B %Y"
             });
           return output;
         }); 

        // When selection changes, output the fired event to the
        // console. the newSelection attribute in the event facade
        // will contain the list of currently selected dates (or be
        // empty if all dates have been deselected).
                calendar.on("selectionChange", function (ev) {
                  scope.$apply(function(){
                    Y.log(ev.newSelection);
                    if (scope.onSelectionChange) scope.onSelectionChange({ dates: ev.newSelection }); 
                  });
         });
         
      });
    }
  };
})
.service('TemplateRender', function () {

})
.constant('FullYearTemplate', '<div class="yui3-g {calendar_pane_class}" id="{calendar_id}">' +  
                 '{header_template}' +
               '<div class="yui3-u-1-4">'+
                       '<div class = "{calendar_left_grid_class}">' +
                    '{calendar_grid_template}' +
                       '</div>' +
               '</div>' +
               '<div class="yui3-u-1-4">' +
                     '<div class = "{calendar_left_grid_class}">' +
                    '{calendar_grid_template}' +
                     '</div>' +
               '</div>' +
                 '<div class="yui3-u-1-4">' +
                       '<div class = "{calendar_right_grid_class}">' +
                    '{calendar_grid_template}' +
                      '</div>' +
               '</div>' +
                 '<div class="yui3-u-1-4">' +
                       '<div class = "{calendar_right_grid_class}">' +
                    '{calendar_grid_template}' +
                       '</div>' +
               '</div>' +
               '<div class="yui3-u-1-4">'+
                       '<div class = "{calendar_left_grid_class}">' +
                    '{calendar_grid_template}' +
                       '</div>' +
               '</div>' +
               '<div class="yui3-u-1-4">' +
                     '<div class = "{calendar_left_grid_class}">' +
                    '{calendar_grid_template}' +
                     '</div>' +
               '</div>' +
                 '<div class="yui3-u-1-4">' +
                       '<div class = "{calendar_right_grid_class}">' +
                    '{calendar_grid_template}' +
                      '</div>' +
               '</div>' +
                 '<div class="yui3-u-1-4">' +
                       '<div class = "{calendar_right_grid_class}">' +
                    '{calendar_grid_template}' +
                       '</div>' +
               '</div>' +
               '<div class="yui3-u-1-4">'+
                       '<div class = "{calendar_left_grid_class}">' +
                    '{calendar_grid_template}' +
                       '</div>' +
               '</div>' +
               '<div class="yui3-u-1-4">' +
                     '<div class = "{calendar_left_grid_class}">' +
                    '{calendar_grid_template}' +
                     '</div>' +
               '</div>' +
                 '<div class="yui3-u-1-4">' +
                       '<div class = "{calendar_right_grid_class}">' +
                    '{calendar_grid_template}' +
                      '</div>' +
               '</div>' +
                 '<div class="yui3-u-1-4">' +
                       '<div class = "{calendar_right_grid_class}">' +
                    '{calendar_grid_template}' +
                       '</div>' +
               '</div>' +
    '</div>')
.service('YcalRenderer', function (YcalLayouts, YcalBaseTemplates) {

  this.render = function ( layout ) {
    var layoutParts = YcalLayouts[layout],
        container = YcalBaseTemplates.container,
        inner = '',
        result;

    angular.forEach(layoutParts, function (part) {
      inner += YcalLayouts[part];
    });

    result = container.replace(/\{__grid__\}/, inner);

    return result;
  };

})
.constant('YcalLayouts', {
  col2: [ 'left2', 'right2', 'left2', 'right2', 'left2', 'right2', 'left2', 'right2', 'left2', 'right2', 'left2', 'right2'],
  col3: [ 'left3', 'right3', 'left3', 'right3', 'left3', 'right3', 'left3', 'right3'],
  col4: [ 'left4', 'right4', 'left4', 'right4', 'left4', 'right4' ]
})
.constant('YcalBaseTemplates', {
  container: '<div class="yui3-g {calendar_pane_class}" id="{calendar_id}">' +  
                 '{header_template}' + '{__grid__}' +
              '</div>',
  left4: '<div class="yui3-u-1-4">'+
                 '<div class = "{calendar_left_grid_class}">' +
              '{calendar_grid_template}' +
                 '</div>' +
         '</div>',
  left3: '<div class="yui3-u-1-3">'+
                 '<div class = "{calendar_left_grid_class}">' +
              '{calendar_grid_template}' +
                 '</div>' +
         '</div>',
  left2: '<div class="yui3-u-1-3">'+
               '<div class = "{calendar_left_grid_class}">' +
            '{calendar_grid_template}' +
               '</div>' +
       '</div>',
  right4: '<div class="yui3-u-1-4">' +
               '<div class = "{calendar_right_grid_class}">' +
            '{calendar_grid_template}' +
               '</div>' +
          '</div>',
  right3: '<div class="yui3-u-1-3">' +
               '<div class = "{calendar_right_grid_class}">' +
            '{calendar_grid_template}' +
               '</div>' +
          '</div>',
  right2: '<div class="yui3-u-1-2">' +
               '<div class = "{calendar_right_grid_class}">' +
            '{calendar_grid_template}' +
               '</div>' +
          '</div>'
});