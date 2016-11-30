(function () {
    'use strict';

    angular
        .module('app')
        .factory('ForumService', forumservice);

    forumservice.$inject = ['$http'];
    function forumservice($http) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetAll() {
            return $http.get('/api/forums').then(handleSuccess, handleError('Error getting all forums'));
        }

        function GetById(id) {
            return $http.get('/api/forums/' + id).then(handleSuccess, handleError('Error getting forum by id'));
        }

        function Create(forum) {
            return $http.post('/api/forums', forum).then(handleSuccess, handleError('Error creating forum'));
        }

        function Update(forum) {
            return $http.put('/api/forums/' + forum.id, forum).then(handleSuccess, handleError('Error updating forum'));
        }

        function Delete(id) {
            return $http.delete('/api/forums/' + id).then(handleSuccess, handleError('Error deleting forum'));
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }

})();
