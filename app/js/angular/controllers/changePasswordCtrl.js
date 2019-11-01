app.controller('changePasswordCtrl', function ($scope, $http, $state, $timeout){
    $scope.errorMsgUser = false;
    $scope.errorMsgNewPwd = false;
    $scope.errorMsgConPwd = false;
    $scope.pwdSuccessMsgShow = false;

    $scope.changeInfo = {
        addUsername:undefined,
        newPassword:undefined,
        conPassword:undefined
    };

    $scope.changePasswordUser = function(){
        $scope.errorMsgUser = false;
        $scope.errorMsgNewPwd = false;
        $scope.errorMsgConPwd = false;
        var conPassword = $scope.changeInfo.conPassword;
        $scope.newPassword = $scope.changeInfo.newPassword;
        var inputData = {
            requestType: '3',
            operation: 'changePassword',
            username: $scope.changeInfo.addUsername,
            newPassword: $scope.newPassword
        };
        if(inputData.username === undefined){
            $scope.errorMsgUser = true;
            $scope.userErrorMsg = "කරුණාකර පරිශීලක නාමය ඇතුලත් කරන්න";
        }if($scope.newPassword === undefined){
            $scope.errorMsgNewPwd = true;
            $scope.newPwdErrorMsg = "කරුණාකර නව මුරපදය ඇතුළත් කරන්න";
        }else if(0 < $scope.newPassword.length && $scope.newPassword.length < 8){
            $scope.errorMsgNewPwd = true;
            $scope.newPwdErrorMsg = "ඔබගේ නව මුරපදය සඳහා අක්ෂර 8 හෝ ඊට වැඩි ගණනක් භාවිතා කරන්න";
        }
        if(conPassword === undefined){
            $scope.errorMsgConPwd = true;
            $scope.conPwdErrorMsg = "කරුණාකර නව මුරපදය තහවුරු කරන්න";
        }else if(inputData.newPassword !== conPassword){
            $scope.errorMsgConPwd = true;
            $scope.conPwdErrorMsg = "නව මුරපදය සහ තහවුරු මුරපදය සමාන නොවේ";
        }else{
            $http({
                method: 'post',
                url: 'app/php/services/requestHandler.php',
                data: inputData,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function successCallBack(response){
                $scope.user = response.data;
                if($scope.user.password === true){
                    $scope.pwdSuccessMsgShow = true;
                    $scope.pwdSuccessMsg = "ඔබගේ මුරපදය සාර්ථකව වෙනස් කරන ලදී";
                    $timeout(function () {
                        $state.go('login');
                    }, 2000);
                }else{
                    $scope.errorMsgUser = true;
                    $scope.userErrorMsg = "පරිශීලක නාමය වැරදියි";
                }
            })
        }
    }
});