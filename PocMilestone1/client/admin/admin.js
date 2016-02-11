/**
 * Created by I306947 on 4/2/14.
 */
jQuery(document).ready(function () {
    var version = 2;
    jQuery(".buttonWrapper").find("#init").click(function () {
        jQuery.get('/DOA---Innojam2016/PocMilestone1/client/mock/targets.json', function (data) {
            data.version = version;
            version++;
            localStorage.setItem("targets", JSON.stringify(data));
        });
        jQuery.post( "/setOkScreenFalse", function(  ) {

        });
    });

    jQuery(".buttonWrapper").find("#okScreen").click(function () {
        if (connection) {
            connection.send(JSON.stringify({event: 'okScreen'}));
        }
    });

    jQuery(".buttonWrapper").find("#add").click(function () {
        jQuery.get('/DOA---Innojam2016/PocMilestone1/client/mock/addTarget.json', function (loadData) {
            var dataStr = localStorage.getItem("targets");
            if (dataStr) {
                var data = JSON.parse(dataStr);
                data.version = version;
                version++;
//                data.targets.push(loadData);
//                data.targets[data.targets.length - 1].warningImage = "warning.png";

                var sSelectedItem = "Alhazov, Sergey";
                for (var j in data.targets){
                    if (data.targets[j].name === sSelectedItem){
                        data.targets[j].warningImage = "warning.png";
                        break;
                    }
                }

                localStorage.setItem("targets", JSON.stringify(data));
            }
        });
    });

    jQuery(".buttonWrapper").find("#error").click(function () {
        var dataStr = localStorage.getItem("targets");
        if (dataStr) {
            var data = JSON.parse(dataStr);
            for (var i in data.targets) {
                if (data.targets[i].name === "Fishler, Ido") {
                    data.version = version;
                    version++;
                    data.targets[i].error = true;
                    data.targets[i].economyData = [
                        30, 31, 29, 33, 30, 30, 31, 32, 30, 31
                    ];
                    localStorage.setItem("targets", JSON.stringify(data));
                    break;
                }
            }
        }
    });

    jQuery(".buttonWrapper").find("#warn").click(function () {
        var dataStr = localStorage.getItem("targets");
        if (dataStr) {
            var data = JSON.parse(dataStr);
            for (var i in data.targets) {
                if (data.targets[i].name === "Fishler, Ido") {
                    data.version = version;
                    version++;
                    data.targets[i].warn = true;
                    localStorage.setItem("targets", JSON.stringify(data));
                    break;
                }
            }
        }
    });



});