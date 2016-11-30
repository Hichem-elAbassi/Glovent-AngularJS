(function () {
    'use strict';

    angular
        .module('app')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', 'AuthenticationService','usersPrepService'];
    function HomeController(UserService, AuthenticationService,usersPrepService) {
        var vm = this;

        vm.user = null;
        //using the routing config to get the usersPrepService as a value from the resolve promess on route
        vm.allUsers = usersPrepService;
        vm.deleteUser = deleteUser;

        initController();

        function initController() {
            loadCurrentUser();

            //this is commented because we are using the resolve on this contorller route
            //see routing config in app.js
            //loadAllUsers();
        }

        function loadCurrentUser() {
            UserService.GetByUsername(AuthenticationService.GetAuthenticatedUser().username)
                .then(function (user) {
                    /*
                    if we are using "promises" we don't have to use "scope.$apply" to validate the ViewModel binding properties change on view
                    (scope.$apply is normaly used on asynchronous javascript callback like this one but it's implemented by default on "promises")
                    */
                    vm.user = user;
                });
        }

        function loadAllUsers() {
            UserService.GetAll()
                .then(function (users) {
                    vm.allUsers = users;
                });
        }

        function deleteUser(id) {
            UserService.Delete(id)
            .then(function () {
                loadAllUsers();
            });
        }
    }

})();