app.controller('logoutCtrl', function($scope, $http, $state){
    $scope.logoutUser = function(){
        var token = localStorage.getItem('token');
        var inputData = {
            requestType: '2',
            operation: 'Logout',
            token: token
        };
        $http({
            method: 'post',
            url: 'app/php/services/requestHandler.php',
            data: inputData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallBack(response) {
            $scope.user = response.data;
            var authentication = $scope.user.logout;
            if(authentication === true){
                localStorage.clear();
                $state.go('login');
            }else{
                $state.go('commonLayout');
            }
        })
    }
});