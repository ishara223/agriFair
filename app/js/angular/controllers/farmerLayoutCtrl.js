app.controller("farmerLayoutCtrl", function($scope, $rootScope,$state){
    $scope.buyerName = localStorage.getItem("username");
    $scope.headerVisible = true;
    $state.go('farmerLayout.farmerHome');
});