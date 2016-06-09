(function () {
    // ### leaderboard
    // Our leaderboard module.
    var app = angular.module('leaderboard', []);

    // ### table
    // Table directive of workouts to display.
    app.directive('leaderboard', function () {
        console.log("TS2");
        return {
            restrict: 'E',
            templateUrl: '/leaderboard/table.html',
            controller: function () {
            
            },
            controllerAs: 'table'
        };
    });
})();