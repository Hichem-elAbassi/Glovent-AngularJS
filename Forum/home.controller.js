(function () {
    'use strict';

    angular
        .module('app')
        .controller('ForumController', ForumController);

    ForumController.$inject = ['ForumService', 'AuthenticationService','ForumsPrepService'];
    function ForumController(ForumService, AuthenticationService,ForumsPrepService) {
        var vm = this;

        vm.Forum = null;
        //using the routing config to get the ForumsPrepService as a value from the resolve promess on route
        vm.allForums = ForumsPrepService;
        vm.deleteForum = deleteForum;

        initController();

        function initController() {
            loadCurrentForum();

            //this is commented because we are using the resolve on this contorller route
            //see routing config in app.js
            //loadAllForums();
        }

        function loadCurrentForum() {
            ForumService.GetByForumname(AuthenticationService.GetAuthenticatedForum().Forumname)
                .then(function (Forum) {
                    /*
                    if we are using "promises" we don't have to use "scope.$apply" to validate the ViewModel binding properties change on view
                    (scope.$apply is normaly used on asynchronous javascript callback like this one but it's implemented by default on "promises")
                    */
                    vm.Forum = Forum;
                });
        }

        function loadAllForums() {
            ForumService.GetAll()
                .then(function (Forums) {
                    vm.allForums = Forums;
                });
        }

        function deleteForum(id) {
            ForumService.Delete(id)
            .then(function () {
                loadAllForums();
            });
        }
    }

})();
