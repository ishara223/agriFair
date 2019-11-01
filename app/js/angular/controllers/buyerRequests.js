app.controller("showBuyerRequestsToFarmerCtrl", function($scope, $rootScope,categories,$state,$http,Map){
 $scope.subCategories =  categories.subCategories;
 $scope.caregory = categories.category;
 $scope.subCategoryName = '';
 $scope.createBuyerRequest = false;
 $scope.farmerRequestInfo = {
    itemName:undefined,
    amount:undefined,
    district:undefined,
    phoneNumber:undefined,
    discription:undefined,
    buyerId:localStorage.getItem("userId")
};
$scope.searchKeyword = '';
var date = new Date();

$scope.getBuyerRequestData = function(buyerRequestId){
    var inputData = {
        requestType: '0',
        operation: 'getBuyerRequestData',
        buyerRequestId:buyerRequestId
    };
    $http({
        method: 'post',
        url: 'app/php/services/requestHandler.php',
        data: inputData,
        //headers: {'Content-Type': 'multipart/form-data'}
    }).then(function successCallBack(response){
        $scope.buyerrequestsData = response.data[0];
            //$scope.kamal = angular.fromJson($scope.user);  
    })
}
$scope.searchBuyerRequest = function(){
    var inputData = {
        requestType: '0',
        operation: 'searchBuyerRequest',
        keyword:$scope.searchKeyword
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
//geo location
//$scope.coords = geolocation.getLocation().then(function(data){
//    return {lat:data.coords.latitude, long:data.coords.longitude};
 // });

//map
/*$scope.place = {};
    
$scope.search = function() {
    $scope.apiError = false;
    Map.search($scope.searchPlace)
    .then(
        function(res) { // success
            Map.addMarker(res);
            $scope.place.name = res.name;
            $scope.place.lat = res.geometry.location.lat();
            $scope.place.lng = res.geometry.location.lng();
        },
        function(status) { // error
            $scope.apiError = true;
            $scope.apiStatus = status;
        }
    );
}

$scope.send = function() {
    alert($scope.place.name + ' : ' + $scope.place.lat + ', ' + $scope.place.lng);    
}

Map.init();*/

//map

$scope.createFarmerRequest = function(){
    //$scope.comparePasswordErrorMsg = false;
    var inputData = {
        requestType: '1',
        operation: 'createFarmerRequest',
        itemName:$scope.farmerRequestInfo.itemName,
        amount:$scope.farmerRequestInfo.amount,
        district: $scope.farmerRequestInfo.district,
        itemDiscription: $scope.farmerRequestInfo.discription,
        buyerId: $scope.farmerRequestInfo.buyerId,
        date: new Date()
    };
    $http({
        method: 'post',
        url: 'app/php/services/requestHandler.php',
        data: inputData,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function successCallBack(response){
        if(response.data.successRegister){
            alert("farmer request created");
            $scope.farmerRequestInfo.itemName = undefined;
            $scope.farmerRequestInfo.amount = undefined;
            $scope.farmerRequestInfo.district = undefined;
            $scope.farmerRequestInfo.phoneNumber = undefined;
            $scope.farmerRequestInfo.discription = undefined;
            $scope.createBuyerRequest = false;
        
        }else if(!response.data.successRegister){
            alert("something went worng please try agian");
        }
    })
}
$scope.showMyFarmerRequests = function(){
    $state.go('buyerLayout.myFarmerRequests');
}

 $scope.showBuyerRequests = function(categoryId,subCategoryId,subCategoryName){
    $scope.subCategoryName = subCategoryName;
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

$scope.showAllBuyerRequests = function(){
    //$scope.subCategoryName = subCategoryName;
    $scope.buyerRequesrsShow = true;
    $scope.getAllBuyerRequests(categories.category);
    }

$scope.getAllBuyerRequests = function (categoryId){
    var inputData = {
        requestType: '0',
        operation: 'getAllBuyerRequests',
        category:categoryId,
        //subCategory:subCategoryId
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

$scope.showCreateBuyerRequest = function(){
    if($scope.createBuyerRequest){
        $scope.createBuyerRequest = false;  
    }
    else{
      $scope.createBuyerRequest = true;  
    }
}

$scope.showAllBuyerRequests();
    

    
});