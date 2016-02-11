var itemServices = app.service('targetsServices', function ($interval,notificationUtils) {
    if (!window.targets) {
        window.targets = [];
    }
    this.item = window.targets;
    this.version = 1;

    this.getChecked = function (){
        return item.checked;
    };

    this.getWarned = function (){
        return item.warned;
    };
    this.setItem = function (value){
        this.item.length = 0;
        this.item.push.apply(this.item, value);
    };
    this.addItem = function (value){
        this.item.push(value);
    };
    this.getItem = function (){
        return this.item;
    };

    this.getVersion = function (){
        return this.version;
    };

    $interval(angular.bind(this, function() {
        var data = angular.fromJson(localStorage.getItem("targets"));
        if (data.version && this.version !== data.version){
            var bIsWarning = false;

            var sSelectedItem = "Alhazov, Sergey";
            var nSelectedIndex = 0;

            if (this.item.length < data.targets.length){
//                notificationUtils.notifyPopupDanger({title : "New Target!", message: "" , icon: "fa fa-bell"})
                this.setItem(data.targets);
            } else {
                for (var i in data.targets){
                    if (data.targets[i].name === sSelectedItem){
                        for (var j in this.item){
                            if (this.item[j].name === sSelectedItem && data.targets[i].warningImage === "warning.png"){
                                nSelectedIndex = j;
                                this.item[j].warningImage = "warning.png";
                                notificationUtils.notifyPopupDanger({title : "Alert!", message: "User: Sergey Alhazov has failed Check-In. Dispatch law enforcement immediately!" , icon: "fa fa-bell"});
                                bIsWarning = true;
                                break;
                                /*if (data.targets[i].error){
                                    this.item[j].error = true;
                                    this.item[j].fortifications = false;
                                    this.item[j].enableSecurityMode = false;
                                    notificationUtils.notifyPopupDanger({title : "Check", message: "you check " +  this.item[j].name , icon: "fa fa-bell"});
                                    break;
                                } else {
                                    this.item[j].warn = true;
                                    this.item[j].fortifications = true;
                                    this.item[j].enableSecurityMode = true;
                                    notificationUtils.notifyPopupInfo({title : "Secure", message: "Activated " + this.item[j].name, icon: "fa fa-empire"})
                                    break;
                                }*/
                            }
                        }
                        break;
                    }
                }
            }

            this.version = data.version;
            if (window.updateHouses){
                window.updateHouses();
            }

            if (bIsWarning && window.setWarning){
                window.setWarning(nSelectedIndex);
            }

        }
        var checked = 0;
        var warned = 0;
        for (var j in this.item){
            if (this.item[j].error){
                checked++;
            }
            if (this.item[j].warn){
                warned ++;
            }
        }

        if (checked != this.item.checked){
            this.item.checked = checked;
        }
        if (warned != this.item.warned){
            this.item.warned = warned;
        }
    }, 5000));
});
