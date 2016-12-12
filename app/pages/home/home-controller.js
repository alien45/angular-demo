/**
 * Created by tchowdhury on 10/12/2016.
 */
angular.module('pages.home', [
    'ngRoute',
    'ui.bootstrap',
    'components.services.data'
]);

/*
 * Set up page routes
 */
angular.module('pages.home').config(function ($routeProvider) {
    'use strict';
    $routeProvider.when('/home', {
        templateUrl: './pages/home/home-view.html',
        controller: 'homeController'
    });
});
angular.module('pages.home').controller('homeController', function ($scope, dataService) {
    $scope.userSelected = null;
    $scope.userRepos = null;
    $scope.userError = null;
    $scope.repoError = null;
    $scope.noUserFound = false;

    /*
     * Search for Github users by partial or complete username
     */
    $scope.searchUsers = function (username) {
        $scope.userError = null;
        return dataService.github.searchUsers(username)
            .then(function (response) {
                return response.data.items;
            }, function (error) {
                $scope.userError = 'Failed to retrieve users';
                console.log(error);
                // no results found
                return [];
            });
    };

    /*
     * Retrieves repositories by username
     *
     * Params:
     * @userSelected string/object: if string will attempt to get user details and then repos
     *
     * Returns void
     */
    $scope.getUserRepositories = function(userSelected) {
        $scope.userRepos = null;
        $scope.repoError = null;
        if (!userSelected || userSelected === '' ||
            (angular.isObject(userSelected) && (!userSelected.login || userSelected.login == ''))) {
            $scope.repoError = 'Please enter a valid username.';
            return;
        }

        // username typed but not selected >> validate username by retrieving user information
        if (angular.isString(userSelected)) {
            $scope.userError = null;
            dataService.github.getUser(userSelected).then(function(response) {
                if (response.data && response.data.id > 0) {
                    $scope.userSelected = response.data;
                    $scope.getUserRepositories($scope.userSelected);
                } else {
                    $scope.userError = response.data.message || 'No matching user found.';
                }
            }, function() {
                $scope.userError = 'No matching user found.';
            });
            return
        }

        // user selected >> get user repositories.
        var username = userSelected.login ? userSelected.login : userSelected;
        dataService.github.getUserRepositories(userSelected.login)
            .then(function(response) {
                if (angular.isArray(response.data)) {
                    $scope.userRepos = response.data;
                } else {
                    $scope.userRepos = [];
                    $scope.repoError = response.data.message ? response.data.message : 'No repo found!';
                }

            }, function(error) {
                $scope.repoError = 'Failed to retrieve user repositories';
                $scope.userRepos = null;
            });
    };


});