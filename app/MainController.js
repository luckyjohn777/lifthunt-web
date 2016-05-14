app.controller("MainController", function ($scope) {
    $scope.isSideNavOpen = false;
    $scope.openLeftMenu = function () {
        $scope.isSideNavOpen = true;
    }
});
