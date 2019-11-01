app.controller("dashBoardMenuCtrl", function($scope, $state, $rootScope){
    $state.go('buyerLayout.dashBoardMenu.episodeOne');
    $scope.powerOnSuccess = false;

    $scope.activityVisible = false;

    $rootScope.$on('onGoingActivity', function(){
        $rootScope.totalMarks = 0;
        /*Sets the style for progress bar*/
        $scope.progressStyle = {
            'width': '0%'
        };
        $scope.activityVisible = true;
        $scope.activityName = $rootScope.activityName;
        $scope.learningObjectiveOne = $rootScope.learningObjectiveOne;
        $scope.progress = '0%';
        $scope.totalMarks = 0;
    });

    $rootScope.$on('closeCurrentActivity', function(){
        $scope.activityVisible = false;
        $rootScope.totalMarks = 0;
    });

    $rootScope.$on("marksUpdated", function(){
        $scope.progressStyle = {
            'width': $rootScope.totalMarks + '%'
        };
        if($rootScope.totalMarks > 0) {
            $scope.progress = $rootScope.totalMarks + '%';
            $scope.totalMarks = $rootScope.totalMarks;
        }
    });

    $rootScope.$on('activityCompleted', function(){
        $scope.activityCompleted = $rootScope.activityCompleted;
    });

    $rootScope.$on('hideSidePanel', function(){
        $scope.activityVisible = false;
    });

    /*$rootScope.$on("powerOnSuccess", function(){
        $scope.powerOnSuccess = true;
    });*/

    /*$rootScope.$on('onGoingFirstHelpVideo', function(){
        $scope.firstHelpVideo = true;
    });

    $rootScope.$on('endFirstHelpVideo', function(){
        $scope.firstHelpVideo = false;
    });*/
});