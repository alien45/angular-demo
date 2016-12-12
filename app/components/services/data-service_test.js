'use strict';

describe('components.services.data module', function () {

    beforeEach(function () {
        module('components.services.data');
    });

    describe('dataService', function () {

        it('should have dataService and dataService.github defined', inject(function (dataService) {
            expect(dataService).toBeDefined();
            expect(dataService.github).toBeDefined();
        }));

        var $httpBackend;
        var testUsername = 'someLogin';
        var id = 9919;

        beforeEach(inject(function($injector) {
            // Set up the mock http service responses
            $httpBackend = $injector.get('$httpBackend');

            // Mock Github get user request
            $httpBackend.when(
                'GET',
                'http://api.github.com/users/' + testUsername
            ).respond(
                200,
                {id: id, login: testUsername}
            );

            // Mock Github search users request
            $httpBackend.when(
                'GET',
                'http://api.github.com/search/users?q=' + testUsername
            ).respond(
                200,
                {items : [
                    {id: id, login: testUsername}
                ]}
            );
        }));


        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        // test getUser()
        it('should have sent a POST request to the Github API', inject(function(dataService) {
            var result = dataService.github.getUser(testUsername);
            $httpBackend.expectGET('http://api.github.com/users/' + testUsername);
            $httpBackend.flush();
        }));

        // test searchUsers()
        it('should have sent a GET request to the Github API', inject(function(dataService) {
            var result = dataService.github.searchUsers(testUsername);
            $httpBackend.expectGET('http://api.github.com/search/users?q=' + testUsername);
            $httpBackend.flush();
        }));

    });
});