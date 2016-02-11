
app.controller("menuCtrl", function($scope,$timeout, httpServices, targetsServices, notificationUtils) {
    $scope.targets = [];
    $scope.targets.checked = 0;

    $scope.targets = targetsServices.getItem();
    $scope.targets.checked = 0;
    $scope.targets.warned = 0;
    $scope.targets.statusBar = "";
    $scope.targets.currentSelectedName = "Adi Swissa";
    $scope.data = {};
    $scope.data.currentSelectedName = "aaa";

    $scope.call = function (target) {
        notificationUtils.notifyPopupSuccess({title : "Call", message: "you called " + target.name, icon: "fa fa-phone"})
    };

    $scope.remove = function (target) {
        notificationUtils.notifyPopupWarning({title : "Remove", message: "", icon: "fa fa-trash"});
        if(target.check){
            $scope.targets.checked--;
        }
        delete target.error;
        delete target.warn;
        window.updateHouses();
        //targetsServices.updateLocalStorage();

    };

    $scope.check = function (target) {
        if(!target.check){
            target.check = true;
            target.checked ++;
            target.error = true;

            target.fortifications = false;
            target.enableSecurityMode = false;
            notificationUtils.notifyPopupDanger({title : "Check", message: "you check " +  target.name , icon: "fa fa-car"});
            window.updateHouses();
            //targetsServices.updateLocalStorage();
        }
    };

    $scope.setFocus = function (house){
        $scope.targets.currentSelectedName = house.name;
        window.focusOnHouse(house);
    };

    $scope.filterEscalated = function (item) {
        return item.error && item.warn;
    };

    $scope.filterAlerts = function (item) {
        return !item.error && item.warn;
    };

});