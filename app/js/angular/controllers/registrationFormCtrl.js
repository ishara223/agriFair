app.controller('registrationFormCtrl', function ($scope, $http, $state, $timeout) {
    $scope.comparePasswordErrorMsg = false;
    $scope.loginSuccessMsgShow = false;
    $scope.usernameExistsMsgShow = false;
    
    $scope.registerInfo = {
        firstName:undefined,
        lastName:undefined,
        username:undefined,
        password:undefined,
        confirmPassword:undefined
    };

    $scope.validatePasswords = function (){
        debugger;
        if ($scope.registerInfo.password !== $scope.registerInfo.confirmPassword){
            $scope.comparePasswordErrorMsg = true;
            $scope.comparePasswordErrorMsgShow = "password nd confirm password did not mached .";
        }
            $scope.checkForDuplicates();
        
    }

    $scope.checkForDuplicates = function(){
        var inputData = {
            requestType: '0',
            operation: 'CheckUsernameDuplicates',
            firstName:$scope.registerInfo.firstName,
            lastName:$scope.registerInfo.lastName,
            username: $scope.registerInfo.userName,
            password: $scope.registerInfo.password
        };
        $http({
            method: 'post',
            url: 'app/php/services/requestHandler.php',
            data: inputData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallBack(response){
            console.log(response.data.duplicateData);
            if(response.data.duplicateData){
                 $scope.usernameExistsMsgShow = true;
                $scope.usernameExistsMsg = "the number that you enterd is alredy used";
            }
            if(response.data.duplicateData == false){
                $scope.registerUser();  
            }
        })
    }

    $scope.registerUser = function(){
        $scope.comparePasswordErrorMsg = false;
        var inputData = {
            requestType: '1',
            operation: 'Registration',
            firstName:$scope.registerInfo.firstName,
            lastName:$scope.registerInfo.lastName,
            username: $scope.registerInfo.userName,
            password: $scope.registerInfo.password
        };
        $http({
            method: 'post',
            url: 'app/php/services/requestHandler.php',
            data: inputData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallBack(response){
            if(response.data.successRegister){
                if($scope.usernameExistsMsgShow){
                    $scope.usernameExistsMsgShow = false;
                    $scope.usernameExistsMsg = "";
                }
                $scope.loginSuccessMsgShow = true;
                $scope.loginSuccessMsg = "you have successfully registered";
                $timeout(function () {
                    $state.go('login');
                },2000);
            }else if(!response.data.successRegister){
                $scope.usernameExistsMsgShow = true;
                // $scope.usernameExistsMsg = "ලියාපදිංචි වීම අසාර්ථකයි. නැවත උත්සහ කරන්න";
                $scope.usernameExistsMsg = "You have alrady registerd plese login";
            }
            // $scope.registrationSuccess = response.data;
            // if($scope.registrationSuccess.successRegister === true){
            //     if($scope.usernameExistsMsgShow){
            //         $scope.usernameExistsMsgShow = false;
            //         $scope.usernameExistsMsg = "";
            //     }
            //     $scope.loginSuccessMsgShow = true;
            //     $scope.loginSuccessMsg = "ඔබ ඊ ලංකාපුර ගමනට සාර්ථකව ලියාපදිංචි විය";
            //     $timeout(function () {
            //         $state.go('login');
            //     },2000);
            // }
            // else{
            //     $scope.usernameExistsMsgShow = true;
            //     $scope.usernameExistsMsg = "ඔබ ඇතුලත් කල පරිශීලක නාමය භාවිතයේ ඇත.කරුණාකර වෙනත් පරිශීලක නාමයක් භාවිත කරන්න";
            // }
        })
    }
});
