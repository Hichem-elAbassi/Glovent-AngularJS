(function () {
    'use strict';

    angular
        .module('app')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['UserService', '$location', '$rootScope', 'FlashService'];
    function RegisterController(UserService, $location, $rootScope, FlashService) {
        var vm = this;

        vm.register = register;

        function register() {
            vm.dataLoading = true;
            UserService.Create(vm.user)
                .then(function (response) {
                        FlashService.Success('Registration successful', true);
                        $location.path('/login');  
                },function(response){
                    FlashService.Error(response.message);
                        vm.dataLoading = false;
                });
        }
    }
/*
    angular
        .module('app', ['ngRoute', 'ngCookies'])
        .config(fnconfig);

    fnconfig.$inject = ['$route'];
    function fnconfig($route) {
        routeProvider=window.routeProvider;
        routeProvider
            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'register/register.view.html',
                controllerAs: 'register'
            });
            $route.reload();
    }
    /**/
})();
