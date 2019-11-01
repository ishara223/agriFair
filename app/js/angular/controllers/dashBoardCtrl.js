app.controller("dashBoardCtrl", function($scope,$rootScope,categories,$http,$state){
$scope.productCategory = true;
$scope.productList = false;
$scope.vegitables = false;
$scope.fruits = false;
$scope.grains = false;
$scope.others = false;
$scope.user = [];
$scope.buyerrequests = [];
$scope.buyerRequesrsShow = false;
$scope.subCategoryName = "";


$scope.getSubCategories=function(category){
    var inputData = {
        requestType: '0',
        operation: 'getSubCategory',
        category:category
    };
    categories.category = category;
    $http({
        method: 'post',
        url: 'app/php/services/requestHandler.php',
        data: inputData,
        //headers: {'Content-Type': 'multipart/form-data'}
    }).then(function successCallBack(response){
        $scope.user = response.data;
        categories.subCategories = response.data;
        //$scope.kamal = angular.fromJson($scope.user);  
    })
}

$scope.getVegitableSubCategories=function(){
    /*$scope.vegitables = true;
    $scope.fruits = false;
    $scope.grains = false;
    $scope.others = false;*/
    $scope.getSubCategories(1);
    $state.go('buyerLayout.buyerRequests');
}

$scope.getFruitsSubCategories=function(){
    $scope.vegitables = false;
    $scope.fruits = true;
    $scope.grains = false;
    $scope.others = false;
    $scope.getSubCategories(2);
    $state.go('buyerLayout.buyerRequests');
}

$scope.getGrainsSubCategories=function(){
    $scope.vegitables = false;
    $scope.fruits = false;
    $scope.grains = true;
    $scope.others = false;
    $scope.getSubCategories(3);
    $state.go('buyerLayout.buyerRequests');
}

$scope.getOtherSubCategories=function(){
    $scope.vegitables = false;
    $scope.fruits = false;
    $scope.grains = false;
    $scope.others = true;
    $scope.getSubCategories(4);
    $state.go('buyerLayout.buyerRequests');
}

$scope.showBuyerRequests = function(categoryId,subCategoryId,subCategoryName){
    $scope.subCategoryName = subCategoryName;
    $scope.productList = false;
    $scope.productCategory = false;
    $scope.vegitables = false;
    $scope.fruits = false;
    $scope.grains = false;
    $scope.others = false;
    $scope.buyerRequesrsShow = true;
    $scope.getBuyerRequests(categoryId,subCategoryId);
}

$scope.getBuyerRequests = function (categoryId,subCategoryId){
    var inputData = {
        requestType: '0',
        operation: 'getBuyerRequests',
        category:categoryId,
        subCategory:subCategoryId
    };
    $http({
        method: 'post',
        url: 'app/php/services/requestHandler.php',
        data: inputData,
        //headers: {'Content-Type': 'multipart/form-data'}
    }).then(function successCallBack(response){
        $scope.buyerrequests = response.data;
            //$scope.kamal = angular.fromJson($scope.user);  
    })
}
    



    $scope.fermerItems = [
    { id: 1, title: 'Learn AngularJS', description: 'Learn,Live,Laugh AngularJS', done: true },
    { id: 2, title: 'Explore hibernate', description: 'Explore and use hibernate instead of jdbc', done: true },
    { id: 3, title: 'Play with spring', description: 'spring seems better have a look', done: false },
    { id: 4, title: 'Try struts', description: 'No more labour work..use struts', done: false },
    { id: 5, title: 'Try servlets', description: 'Aah..servlets stack seems cool..why dont u try once', done: false }
    ];
});