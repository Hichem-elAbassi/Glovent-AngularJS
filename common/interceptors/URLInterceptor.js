(function () {
    'use strict';
    angular.module('app')
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push(function ($q) {
             return {
                 'request': function (config) {
                    var externalLinks={
                        "{api}":"http://127.0.0.1:8085/server",
                        "{store}":"http://127.0.0.1:8085/server/store"
                    }
                    for(var i in externalLinks){
                        if(config.url.indexOf(i)!=-1){
                            config.url=config.url.split(i).join(externalLinks[i]);
                        }
                    }
					console.log(config);
					return config || $q.when(config);
                 }

             }
         });
     })
     //run the testing function to invoke $http request and test interceptor (see console log to verify)
     .run(testing);
     testing.$inject=['$http'];
     function testing($http){
        //invoke $http request using {api} so interceptor would intercept
        $http.get('{api}/index.php')
        .success(successHandler)
        .error(errorHandler);
        function successHandler(data) { 
            console.log(data) 
        }
        function errorHandler(fail) {
            console.log(fail);
        }
     }
})();