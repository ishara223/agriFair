app.controller("adminLayoutCtrl", function($scope, $rootScope,$state,$http){
    //$scope.news = NewsService.news;
    $scope.form = [];
    $scope.files = [];
    $scope.userName = {}

    $scope.submit = function() {
        $scope.form.image = $scope.files[0];
        $scope.form.userId = localStorage.getItem("userId");
        $http({
        method  : 'POST',
        url     : 'app/php/image.php',
        processData: false,
        transformRequest: function (data) {
            var formData = new FormData();
            formData.append("image", $scope.form.image);  
            formData.append("subCategoryName", $scope.form.subCategoryName);
            formData.append("categoryId", $scope.form.categoryId);
            formData.append("userId", $scope.form.userId);
            return formData;  
        },  
        data : $scope.form,
        headers: {
               'Content-Type': undefined
        }
     }).then(function successCallBack(response){});
     /*.success(function(data){
          alert(data);
     });*/
    };

    $scope.uploadedFile = function(element) {
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
});