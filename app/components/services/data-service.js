/**
 * Created by tchowdhury on 10/12/2016.
 */

angular.module('components.services.data', []);

/*
 * Data service contains any data/api related functions
 */
angular.module('components.services.data').factory('dataService', function(githubDataService) {
    'use strict';

    var dataService = {};
    dataService.github = githubDataService;
    return dataService;

});

/*
 * Github api services
 */
angular.module('components.services.data').factory('githubDataService', function($http) {
    var apiUrl = 'http://api.github.com';
    var service = {};

    /*
     * Retrieves list of Github user details by partial or complete username.
     *
     * Params:
     * @username string : Github login/username.
     *
     * Returns
     * Angular $http Promise
     */
    service.searchUsers = function(username) {
        return $http.get(apiUrl + '/search/users?q=' + username)
    };

    /*
     * Retrieve Github user details by username.
     * If successful, should return an array of objects with the following attributes:
     * @id
     * @avatar_url
     * @name
     * @type
     * @location
     * @html_url //github user page
     * @public_repos // total number of repos
     * @repos_url // url to api
     *
     * Params:
     * @username string : Github login/username
     *
     * Returns
     * Angular $http Promise
     */
    service.getUser = function(username) {
        return $http.get(apiUrl + '/users/' + username)
    };

    /*
     * Retrieve repositories by Github username.
     * If successful, should return an array of objects with the following attributes:
     * @id
     * @name
     * @description
     * @private bool // indicates whether repo is private
     * @url // github api url
     * @html_url // github repo page
     * @language //programming language
     * @clone_url
     * @created_at
     * @updated_at
     *
     * Params:
     * @username string : Github login/username
     *
     * Returns
     * Angular $http Promise
     */
    service.getUserRepositories = function(username) {
        return $http.get(apiUrl + '/users/' + username + '/repos')
    };

    return service;
});