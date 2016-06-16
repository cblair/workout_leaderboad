'use strict';

(function () {
    // URL for our data API.
    const LEADERBOARD_API_URL = 
        'https://apis.trainheroic.com/public/leaderboard/468425';

    // ### leaderboard
    // Our leaderboard module.
    var app = angular.module('leaderboard', []);

    // ### leaderboard
    // Leaderboard table directive of workouts to display.
    app.directive('leaderboard', ['$http', function ($http) {
        return {
            restrict: 'E',
            templateUrl: '/leaderboard/table.html',
            controller: function () {
                // Create a closure reference for our Promises.
                var leaderboardCtl = this;

                // How fast to cycle the leaderboard (milliseconds).
                this.cycleInterval = 5000;

                // ### leaderboardData
                // List of all the data point in the leader board.
                this.leaderboardData = [];

                // How many segments to show at one time.
                this.displaySegments = 10;

                // ### segments
                // Count of how many total workout data segments we've split the
                // data up into.
                this.segments = 0;

                // ### workoutCount
                // Count of how many workouts are in the data, set when
                // efficient to do so.
                this.workoutCount = 0;
                
                // ### getLeaderboardData
                // Get leaderboard data from the API. This function exposes
                // the data as segments, which sizes are limited. Similar to
                // most pagination schemes. For example, if total data size
                // is 200, settings size to 10 gives 20 segments. Asking for
                // segment 1 gives points 0-9, 2 gives 10-19, etc.
                //
                // #### Params
                // `segment` (Number) - which nth segement to get. 0 based.
                // `size` (Number) - the size of the segments.
                //
                // #### Returns
                // (Promise) A promise to be fullfilled when the data request
                // has a response.
                //
                // #### Enhancements
                // Find out what params the API can take so it segments the
                // data for us.
                this.getLeaderboardData = function (segment, size) {
                    // TODO - the right way would be to pass these params to
                    // the API, which hopefully takes similar parameters as this
                    // function. We'll fake this for now, ineffeciently getting
                    // all the data, until we learn more about the API.
                    return $http.get(LEADERBOARD_API_URL
                        // TODO - here's where we should put API params.
                        )
                        .then(
                            function success(response) {
                                var data = response &&
                                    response.data &&
                                    response.data.results &&
                                    Array.isArray(response.data.results) ?
                                        response.data.results : []

                                    // Set cached stats about the data.
                                    leaderboardCtl.workoutCount = data.length;
                                    leaderboardCtl.segments = Math.ceil(
                                        data.length / size);

                                return leaderboardCtl.getSegmentedData(data,
                                    segment, size);
                            },
                            function error(response) {
                                return ('error');
                            }
                        );
                };

                this.getSegmentedData = function (data, segment, size) {
                    return new Promise(function(fullfill, reject) {
                        var from = segment * size,
                            to = from + size,
                            segmentData = data.slice(from, to);

                        fullfill(segmentData);
                    });
                };

                this.cycleLeaderboard = function () {
                    var segment = 0;
                    var updateData = function () {
                        var result = leaderboardCtl.getLeaderboardData(segment,
                                leaderboardCtl.displaySegments)
                            .then(function (data) {
                                leaderboardCtl.leaderboardData = data;

                                segment = (segment + 1) % leaderboardCtl.segments;
                            });
                        setTimeout(updateData, leaderboardCtl.cycleInterval);
                    };
                    updateData();
                };

                // ### Start
                // Start the leaderboard cycle.
                this.cycleLeaderboard();
            },
            controllerAs: 'leaderboardCtl'
        };
    }]);
})();