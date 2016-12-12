'use strict';

describe('pages.home module', function () {

    var $scope;

    beforeEach(function () {
        module('pages.home');
    });

    describe('homeController controller', function () {

        it('should have homeController defined', inject(function ($rootScope, $controller) {
            $scope = $rootScope.$new();

            //spec body
            var homeController = $controller('homeController',{
                $scope: $scope
            });
            expect(homeController).toBeDefined();
        }));

    });
});