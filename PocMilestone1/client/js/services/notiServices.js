/**
 * Created by I306947 on 1/5/2016.
 */
app.service('notificationUtils', function () {
    this.notifyPopup = function (props,type){
        $.notify({
            title : props.title || "",
            message : props.message || "",
            url : props.url || "",
            icon : props.icon || ""
        },{
            animate: {
                enter: 'animated fadeIn',
                exit: 'animated fadeOut'
            },
            placement: {
                from: 'bottom',
                align: 'right'
            },
            type: type,
            delay: 20000,
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 col-lg-2 alert alert-{0}" role="alert">' +
            '<span class="notificationIcon fa-2x" data-notify="icon"></span>' +
            '<div style="overflow: hidden; text-overflow: ellipsis">' +

            '<span class="notificationTitle" data-notify="title">{1}</span><br>' +
            '<span class="notificationMessage" data-notify="message">{2}</span>' +
            '</div>' +
                //'<div class="progress" data-notify="progressbar">' +
                //'<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>'
        });
    };
    this.notifyPopupSuccess = function (props){
        this.notifyPopup(props,"success");
    };
    this.notifyPopupWarning = function (props){
        this.notifyPopup(props,"warning");
    };
    this.notifyPopupInfo = function (props){
        this.notifyPopup(props,"info");
    };
    this.notifyPopupDanger = function (props){
        this.notifyPopup(props,"danger");
    };
});