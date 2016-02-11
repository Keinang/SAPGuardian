var httpServices = app.service('httpServices', function ($location,$http,http,$window) {
    var object = {
        getUrlParam : function (name) {
            name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
            var regexS = "[\\?&]"+name+"=([^&#]*)";
            var regex = new RegExp( regexS );
            var results = regex.exec( window.location.href );
            if( !results )
                return null;
            else
                return results[1];
        },// get URL param
        isStatic : function () {
            return this.getUrlParam('static') === 'true';
        },
        nav : function (url) {
            if (this.isStatic()){
                this.navStatic(url);
            } else {
                $location.url(url);
            }
        },//nav
        navStatic : function (url){
            $location.url(url).search('static' , 'true');
        },//nav static
        navNewTab : function (url){
            $window.open(url, '_blank');
        },
        ajaxRequest : function (url,method,data,successCallBack,errorCallBack) {
            $http({
                url: url,
                method: method,
                data: data,
                withCredentials: true,
                headers: {
                    //'Access-Control-Allow-Origin': 'http://localhost',
                    //'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
                    //'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
                    //'Access-Control-Allow-Credentials': true,
                    'Content-Type': 'application/json; charset=utf-8'
                    //'Data-Type': "json"
                }
            }).success(function (data, status, headers, config) {
                if (status == 200 && !data) {
                    return;
                }
                successCallBack(data);
            }).error(function (data, status, headers, config) {
                if (status == 401) {
                    object['nav'](headers('Location'));
                } else {
                    errorCallBack(status);
                }
            });
        }, //ajaxRequest
        getRequest : function (url,successCallBack,errorCallBack){
            object['ajaxRequest'](url,http.get,undefined,successCallBack,errorCallBack)
        },//getRequest
        putRequest : function (url,data,successCallBack,errorCallBack){
            object['ajaxRequest'](url,http.put,data,successCallBack,errorCallBack)
        },//putRequest
        postRequest : function (url,data,successCallBack,errorCallBack){
            object['ajaxRequest'](url,http.post,data,successCallBack,errorCallBack)
        },//postRequest
        deleteRequest : function (url,successCallBack,errorCallBack){
            object['ajaxRequest'](url,http.delete,undefined,successCallBack,errorCallBack)
        }//deleteRequest
    };
    return object;
});

var UUIDUtils = app.service('UUIDUtils', function (){
    this.getUUID = function generateUUID(){
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };
});

