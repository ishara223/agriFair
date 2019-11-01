app.controller("farmerHomeCtrl", function($scope, $rootScope,$state,$http){
    $scope.buyerRequestInfo = [];
    $scope.form = [];
    $scope.files = [];
    $scope.farmerRequestInfo = [];
    if($scope.image_source = ""){
        $scope.imageShow = false;
    }
    
    /*$scope.createBuyerRequest = function(){
        //$scope.comparePasswordErrorMsg = false;
        //$scope.form.image = $scope.files[0];
        var inputData = {
            requestType: '1',
            operation: 'createBuyerRequest',
            itemName:$scope.buyerRequestInfo.item_name,
            amount:$scope.buyerRequestInfo.amount,
            district: $scope.buyerRequestInfo.district,
            itemDiscription: $scope.buyerRequestInfo.discription,
            phoneNumber:$scope.buyerRequestInfo.phone_number,
            buyerId: localStorage.getItem("userId"),
            image:$scope.files[0]
        };
        $http({
            method: 'post',
            url: 'app/php/services/requestHandler.php',
            data: inputData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallBack(response){
            if(response.data.successRegister){
                alert("farmer request created");
                /*$scope.buyerRequestInfo.itemName = undefined;
                $scope.buyerRequestInfo.amount = undefined;
                $scope.buyerRequestInfo.district = undefined;
                $scope.buyerRequestInfo.phoneNumber = undefined;
                $scope.buyerRequestInfo.discription = undefined;
                $scope.createBuyerRequest = false;
            
            }else if(!response.data.successRegister){
                alert("something went worng please try agian");
            }
        })
    }*/

    $scope.submit = function() {
        $scope.form.image = $scope.files[0];
        $scope.form.userId = localStorage.getItem("userId");
        $http({
        method  : 'POST',
        url     : 'app/php/createBuyerRequestController.php',
        processData: false,
        transformRequest: function (data) {
            var formData = new FormData();
            formData.append("image", $scope.form.image);  
            formData.append("itemName", $scope.form.itemName);
            formData.append("categoryId", $scope.form.categoryId);
            formData.append("userId", $scope.form.userId);
            formData.append("unitPrice", $scope.form.unitPrice);
            formData.append("bulkPrice", $scope.form.bulkPrice);
            formData.append("discount", $scope.form.discount);
            formData.append("district", $scope.form.district);
            formData.append("phone_number", $scope.form.phone_number);
            formData.append("discription", $scope.form.discription);
            formData.append("amount", $scope.form.amount);
            return formData;  
        },  
        data : $scope.form,
        headers: {
               'Content-Type': undefined
        }
     }).then(function successCallBack(response){});
     alert("buyer request created successfully");
    };

    $scope.uploadedFile = function(element) {
        $scope.imageShow = true;
        $scope.currentFile = element.files[0];
        var reader = new FileReader();

        reader.onload = function(event) {
            $scope.image_source = event.target.result
            $scope.$apply(function($scope) {
            $scope.files = element.files;
            });
        }
        reader.readAsDataURL(element.files[0]);
    }

    $scope.getAllFarmerRequests = function (){
        var inputData = {
            requestType: '0',
            operation: 'getAllFarmerRequests',
            //userId:'345',
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

    $scope.getAllFarmerRequests();
    
});