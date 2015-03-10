angular
    .module('app')
    .controller('FormControl', FormControl);

function FormControl($scope, $http) {
	$scope.errorMsg = "";
	$scope.successMsg = "";
    $scope.Form = {};

    $scope.subscribe = function() {
        $http.post('/subscribe', $scope.Form)
        .success(function(data) {
            $scope.successMsg = data;
        }).error(function(err) {
            $scope.errorMsg = err;
        });
    }
}
