app.controller('feedbackFormCtrl', function($scope,$http,$rootScope,$state){
    $rootScope.$broadcast("hideSidePanel");
    $scope.activityVisible = false;
    $scope.ideas = '';
    $scope.sendFeedBack = function(){
        
        var data = {
            questions: [],
            userId: localStorage.getItem('userId'),
            requestType: '1',
            operation: 'SubmitFeedback'
        };

        $.each(sliders, (index, element) => {
            var q = {
                questionId: $('#slider_' + index).data('qid'),
                value: element.getValue()
            };
            data.questions.push(q);
        });

        data.questions.push({
            questionId: 6,
            value: $scope.ideas
        });

        $http({
            method: 'post',
            url: 'app/php/services/requestHandler.php',
            data: data,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function successCallBack(response){
            if(response.data.success) {
                setTimeout(function () {
                    $rootScope.allActivityCompleteMsg = true;
                   $state.go('commonLayout.dashBoardMenu.episodeOne');
                    // $state.go('commonLayout.dashBoardMenu.feedbackForm');
                   $rootScope.displayResultSheet();
                    /*$timeout(function () {
                        $scope.allActivityCompleteMsg = true;
                        $state.go('commonLayout.dashBoard');
                    }, 4000);*/
                    /*$scope.showNextVideoPart('/e-lankapura/app/src/videos/story/episodeOne/ep_01_cut_05.mp4');*/
                }, 3000);
                setTimeout(function () {
                    $scope.allActivityCompleteMsg = true;
                    $state.go('commonLayout.dashBoard');
                }, 4000)
            }
        })
    }
});