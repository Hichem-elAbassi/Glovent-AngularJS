(function () {
    'use strict';

    angular
        .module('app')
        .factory('LsForumService', LsForumService);

    LsForumService.$inject = ['$timeout', '$filter', '$q'];
    function LsForumService($timeout, $filter, $q) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve(getForums());
            }, 1000);
            return deferred.promise;
        }

        function GetById(id) {
            var deferred = $q.defer();
            $timeout(function () {
                var filtered = $filter('filter')(getForums(), { id: id });
                var Forum = filtered.length ? filtered[0] : null;
                deferred.resolve(Forum);
            }, 1000);
            return deferred.promise;
        }

        function Create(Forum) {
            var deferred = $q.defer();

            // simulate api call with $timeout
            $timeout(function () {
                GetByname(Forum.name)
                    .then(function (_Forum) {
                        if (_Forum !== null) {
                            deferred.reject({ success: false, message: 'name "' + Forum.name + '" is already taken' });
                        } else {
                            var Forums = getForums();

                            // assign id
                            var lastForum = Forums[Forums.length - 1] || { id: 0 };
                            Forum.id = lastForum.id + 1;

                            // save to local storage
                            Forums.push(Forum);
                            setForums(Forums);

                            deferred.resolve({ success: true });
                        }
                    },error);
                    function error(e){};
            }, 1000);

            return deferred.promise;
        }

        function Update(Forum) {
            var deferred = $q.defer();

            $timeout(function () {
                var Forums = getForums();
                for (var i = 0; i < Forums.length; i++) {
                    if (Forums[i].id === Forum.id) {
                        Forums[i] = Forum;
                        break;
                    }
                }
                setForums(Forums);
                deferred.resolve();
            }, 1000);

            return deferred.promise;
        }

        function Delete(id) {
            var deferred = $q.defer();

            $timeout(function () {
                var Forums = getForums();
                for (var i = 0; i < Forums.length; i++) {
                    var Forum = Forums[i];
                    if (Forum.id === id) {
                        Forums.splice(i, 1);
                        break;
                    }
                }
                setForums(Forums);
                deferred.resolve();
            }, 1000);

            return deferred.promise;
        }

        // private functions

        function getForums() {
            if(!localStorage.Forums){
                localStorage.Forums = JSON.stringify([]);
            }

            return JSON.parse(localStorage.Forums);
        }

        function setForums(Forums) {
            localStorage.Forums = JSON.stringify(Forums);
        }
    }
})();
