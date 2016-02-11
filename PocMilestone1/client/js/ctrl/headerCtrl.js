
app.controller("headerCtrl", function($scope, httpServices, targetsServices, notificationUtils) {
    $scope.targets = targetsServices.getItem();

});