/**
 * Created by lkc0987 on 10/16/14.
 */
angular.module('F1FeederApp.controllers', []).
    controller('driversController', function($scope, $routeParams, ergastAPIservice) {
        $scope.nameFilter = null;
        $scope.driversList = [];
        $scope.races = [];
        $scope.driver = null;
        $scope.id = $routeParams.id;

        $scope.searchFilter = function (driver) {
            var keyword = new RegExp($scope.nameFilter, 'i');
            return !$scope.nameFilter || keyword.test(driver.Driver.givenName) || keyword.test(driver.Driver.familyName);
        };

        ergastAPIservice.getDrivers().success(function (response) {
            //Dig into the responde to get the relevant data
            $scope.driversList = response.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        });

        ergastAPIservice.getDriverDetails($scope.id).success(function (response) {
            $scope.driver = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
        });

        ergastAPIservice.getDriverRaces($scope.id).success(function (response) {
            $scope.races = response.MRData.RaceTable.Races;
        });
    }).

    /* Driver controller */
    controller('driverController', function($scope, $routeParams, ergastAPIservice) {
        $scope.id = $routeParams.id;
        $scope.races = [];
        $scope.driver = null;

        ergastAPIservice.getDriverDetails($scope.id).success(function (response) {
            $scope.driver = response.MRData.StandingsTable.StandingsLists[0].DriverStandings[0];
        });

        ergastAPIservice.getDriverRaces($scope.id).success(function (response) {
            $scope.races = response.MRData.RaceTable.Races;
        });
    });