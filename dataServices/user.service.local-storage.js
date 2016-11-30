(function () {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$timeout', '$filter', '$q'];
    function UserService($timeout, $filter, $q) {

        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.GetByUsernameAndPassword=GetByUsernameAndPassword;

        return service;

        function GetAll() {
            var deferred = $q.defer();
            $timeout(function () {
                deferred.resolve(getUsers());
            }, 1000);
            return deferred.promise;
        }

        function GetById(id) {
            var deferred = $q.defer();
            $timeout(function () {
                var filtered = $filter('filter')(getUsers(), { id: id });
                var user = filtered.length ? filtered[0] : null;
                deferred.resolve(user);
            }, 1000);
            return deferred.promise;
        }

        function GetByUsername(username) {
            var deferred = $q.defer();
            $timeout(function () {
                var filtered = $filter('filter')(getUsers(), { username: username });
                var user = filtered.length ? filtered[0] : null;
                deferred.resolve(user);
            }, 1000);
            return deferred.promise;
        }

        function GetByUsernameAndPassword(_user) {
            var deferred = $q.defer();
            $timeout(function () {
                var filtered = $filter('filter')(getUsers(), _user);
                var user = filtered.length ? filtered[0] : null;
                deferred.resolve(user);
            }, 1000);
            return deferred.promise;
        }

        function Create(user) {
            var deferred = $q.defer();

            // simulate api call with $timeout
            $timeout(function () {
                GetByUsername(user.username)
                    .then(function (_user) {
                        if (_user !== null) {
                            deferred.reject({ success: false, message: 'Username "' + user.username + '" is already taken' });
                        } else {
                            var users = getUsers();

                            // assign id
                            var lastUser = users[users.length - 1] || { id: 0 };
                            user.id = lastUser.id + 1;

                            // save to local storage
                            users.push(user);
                            setUsers(users);

                            deferred.resolve({ success: true });
                        }
                    },error);
                    function error(e){};
            }, 1000);

            return deferred.promise;
        }

        function Update(user) {
            var deferred = $q.defer();

            $timeout(function () {
                var users = getUsers();
                for (var i = 0; i < users.length; i++) {
                    if (users[i].id === user.id) {
                        users[i] = user;
                        break;
                    }
                }
                setUsers(users);
                deferred.resolve();
            }, 1000);

            return deferred.promise;
        }

        function Delete(id) {
            var deferred = $q.defer();

            $timeout(function () {
                var users = getUsers();
                for (var i = 0; i < users.length; i++) {
                    var user = users[i];
                    if (user.id === id) {
                        users.splice(i, 1);
                        break;
                    }
                }
                setUsers(users);
                deferred.resolve();
            }, 1000);

            return deferred.promise;
        }

        // private functions

        function getUsers() {
            if(!localStorage.users){
                localStorage.users = JSON.stringify([]);
            }

            return JSON.parse(localStorage.users);
        }

        function setUsers(users) {
            localStorage.users = JSON.stringify(users);
        }
    }
})();