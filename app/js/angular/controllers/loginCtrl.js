
app.controller("loginCtrl", function($scope, $state, $rootScope, $http){
    //$scope.news = NewsService.news;
    $scope.loginInfo = {
        username:undefined,
        password:undefined
    };
    $scope.loginUser = function(){
        $scope.errorMsgUser = false;
        $scope.errorMsgPass = false;
        var inputData = {
            requestType: '0',
            operation: 'Login',
            username: $scope.loginInfo.username,
            password: $scope.loginInfo.password
        };
        if(inputData.username === undefined && inputData.password === undefined){
            $scope.errorMsgPass = true;
            $scope.errorMsgPassword = "please enter phone number and password";
        }else if(inputData.username === undefined){
            $scope.errorMsgUser = true;
            $scope.errorMsgUsername = " please enter phone number ";
        }else if(inputData.password === undefined){
            $scope.errorMsgPass = true;
            $scope.errorMsgPassword = "please enter password";
        }else{
            $http({
                method: 'post',
                url: 'app/php/services/requestHandler.php',
                data: inputData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallBack(response){
                $scope.user = response.data;               
                var authentication = $scope.user.token;
                var userRole = $scope.user.role;
                if(authentication === undefined || authentication === false){
                    $scope.errorMsgPass = true;
                    $scope.errorMsgPassword = "phone number or password incorrect";
                }else{
                    localStorage.setItem('token',$scope.user.token);
                    localStorage.setItem('username',$scope.user.username);
                    localStorage.setItem('userId',$scope.user.userId);
                    localStorage.setItem('userRole',$scope.user.userRole);
                    if(userRole == 0){
                        //$rootScope.idfarmer = true;
                        $state.go('buyerLayout');
                    }
                    else if(userRole == 1){
                        //$rootScope.isByer = true;
                        $state.go('farmerLayout');
                    }
                    else if(userRole == 2){
                        //$scope.$parent.$broadcast('value changed',$scope.loginInfo);
                        //$rootScope.isByer = true;
                        $state.go('adminLayout');
                    }
                }
            })
        }
    }
});