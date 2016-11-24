forumsModule.factory("factory.ForumsModule",['$http',function($scope,$http){
 return {
   getAll:function($http){
     return ForumsProvider;
   },
   addForum:function($scope){
     $http.post(ForumsWS+$scope.forum)
   }
 }
}]);
