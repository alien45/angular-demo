/**
 * Created by tchowdhury on 10/12/2016.
 */

angular.module('components.services.data', []);

/*
 * Data services
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

    service.searchUsers = function(username) {
        return $http.get(apiUrl + '/search/users?q=' + username)
    };

    /*
     * id
     * avatar_url
     * name
     * type
     * location
     * html_url //github user page
     * public_repos // total number of repos
     * repos_url // url to api
     */
    service.getUser = function(username) {
        return $http.get(apiUrl + '/users/' + username)
    };

    /*
     * id
     * name
     * description
     * private bool // indicates whether repo is private
     * url // github api url
     * html_url // github repo page
     * language //programming language
     * clone_url
     * created_at
     * updated_at
     */
    service.getUserRepositories = function(username) {
        return $http.get(apiUrl + '/users/' + username + '/repos')
    };

    return service;
});