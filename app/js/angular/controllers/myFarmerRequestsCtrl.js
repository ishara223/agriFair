app.controller("myFarmerRequestCtrl", function($scope, $rootScope,$state,$http){
    $scope.createBuyerRequest = false;
    $scope.deleteFarmerRequest = null;
    $scope.myFarmerRequests = {};
    $scope.createFrmerRequestForm = true;
    $scope.editFarmerRequestForm = false;

    $scope.farmerRequestInfo = {
        farmer_request_id:undefined,
        item_name:undefined,
        amount:undefined,
        district:undefined,
        phone_number:undefined,
        item_description:undefined,
        buyerId:localStorage.getItem("userId")
    };

    $scope.getMyFarmerRequests = function (){
        var inputData = {
            requestType: '0',
            operation: 'getMyFarmerRequests',
            userId:localStorage.getItem("userId"),
            //subCategory:subCategoryId
        };
        $http({
            method: 'post',
            url: 'app/php/services/requestHandler.php',
            data: inputData,
            //headers: {'Content-Type': 'multipart/form-data'}
        }).then(function successCallBack(response){
            $scope.myFarmerRequests = response.data;
                //$scope.kamal = angular.fromJson($scope.user);  
        })
    }
    $scope.deleteMyFarmerRequest = function(farmerRequestId){
        var inputData = {
            requestType: '2',
            operation: 'deleteMyFarmerRequests',
            farmerRequestId:farmerRequestId
        };
        $http({
            method: 'post',
            url: 'app/php/services/requestHandler.php',
            data: inputData,
            //headers: {'Content-Type': 'multipart/form-data'}
        }).then(function successCallBack(response){
            $scope.deleteFarmerRequest = response.data.deleteFarmerRequest; 
            if($scope.deleteFarmerRequest){
                $scope.getMyFarmerRequests();
                alert("farmer request delete successfully");
            }
            else{
                alert("some thing went to wrong try agian");
            }
        })
    }
    
    $scope.createFarmerRequest = function(){
        //$scope.comparePasswordErrorMsg = false;
        var inputData = {
            requestType: '1',
            operation: 'createFarmerRequest',
            itemName:$scope.farmerRequestInfo.item_name,
            amount:$scope.farmerRequestInfo.amount,
            district: $scope.farmerRequestInfo.district,
            itemDiscription: $scope.farmerRequestInfo.item_description,
            buyerId: $scope.farmerRequestInfo.buyerId
        };
        $http({
            method: 'post',
            url: 'app/php/services/requestHandler.php',
            data: inputData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallBack(response){
            if(response.data.successRegister){
                $scope.getMyFarmerRequests();
                alert("farmer request created");
                $scope.farmerRequestInfo.item_name = undefined;
                $scope.farmerRequestInfo.amount = undefined;
                $scope.farmerRequestInfo.district = undefined;
                $scope.farmerRequestInfo.phone_number = undefined;
                $scope.farmerRequestInfo.item_description = undefined;
                $scope.createBuyerRequest = false;
            
            }else if(!response.data.successRegister){
                alert("something went worng please try agian");
            }
        })
    }

   $scope.editMyFarmerRequest = function(farmerRequestId){
        $scope.createBuyerRequest = true;
        $scope.createFrmerRequestForm = false;
        $scope.editFarmerRequestForm = true;
        var inputData = {
            requestType: '0',
            operation: 'getOneFarmerRequest',
            userId:localStorage.getItem("userId"),
            farmerRequestId:farmerRequestId
        };
        $http({
            method: 'post',
            url: 'app/php/services/requestHandler.php',
            data: inputData,
            //headers: {'Content-Type': 'multipart/form-data'}
        }).then(function successCallBack(response){
            $scope.farmerRequestInfo = response.data[0];
                //$scope.kamal = angular.fromJson($scope.user);  
        })
    }

    $scope.showMyBuyerRequests = function(){
        $state.go('buyerLayout.buyerRequests');
    }

    $scope.showCreateBuyerRequest = function(){
        $scope.createFrmerRequestForm = true;
        $scope.editFarmerRequestForm = false;
        $scope.farmerRequestInfo.item_name = undefined;
        $scope.farmerRequestInfo.amount = undefined;
        $scope.farmerRequestInfo.district = undefined;
        $scope.farmerRequestInfo.phone_number = undefined;
        $scope.farmerRequestInfo.item_description = undefined;
        if($scope.createBuyerRequest){
            $scope.createBuyerRequest = false;  
        }
        else{
          $scope.createBuyerRequest = true;  
        }
    }
    
    $scope.getMyFarmerRequests();
});