app.controller("buyerLayoutCtrl", function($scope, $rootScope,$state){
    //$rootScope.isBuyer = $scope.isBuyers;
   /* $rootScope.$on('isEpisode', function(){
        $scope.headerVisible = false;
    });
    */
    $scope.isByer = $rootScope.isByer
    $scope.buyerName = localStorage.getItem("username");
    $scope.headerVisible = true;
    $state.go('buyerLayout.dashBoard');
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDay();
});