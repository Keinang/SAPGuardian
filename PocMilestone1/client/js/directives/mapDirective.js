var googleMap = app.directive('googleMap', function () {
    // directive link function
    var link = function (scope, element, attrs) {
        var map, infoWindow;
        var markers = [];

        // map config
        var mapOptions = {
            center: scope.place.geometry.location,
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };

        // init the map
        function initMap() {
            if (map === void 0) {
                map = new google.maps.Map(element[0], mapOptions);
            }
        }

        // place a marker
        function setMarker(map, position, title, content) {
            var marker;
            var markerOptions = {
                position: position,
                map: map,
                title: title,
                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
            };

            marker = new google.maps.Marker(markerOptions);
            markers.push(marker); // add marker to array

            google.maps.event.addListener(marker, 'click', function () {
                // close window if not undefined
                if (infoWindow !== void 0) {
                    infoWindow.close();
                }
                // create new window
                var infoWindowOptions = {
                    content: content
                };
                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                infoWindow.open(map, marker);
            });
        }

        var input = /** @type {HTMLInputElement} */(
            document.getElementById(attrs.searchMapId));
        if (input){
            var searchBox = new google.maps.places.SearchBox(
                /** @type {HTMLInputElement} */(input));

            // [START region_getplaces]
            // Listen for the event fired when the user selects an item from the
            // pick list. Retrieve the matching places for that item.
            google.maps.event.addListener(searchBox, 'places_changed', function () {
                var places = searchBox.getPlaces();
                var i = 0, place, marker;
                if (places.length == 0) {
                    return;
                }
                for (i = 0; marker = markers[i]; i++) {
                    marker.setMap(null);
                }

                // For each place, get the icon, place name, and location.
                markers = [];
                var bounds = new google.maps.LatLngBounds();
                for (i = 0; place = places[i]; i++) {
                    var image = {
                        url: place.icon,
                        size: new google.maps.Size(25, 25),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(15, 15)
                    };

                    // Create a marker for each place.
                    marker = new google.maps.Marker({
                        map: map,
                        icon: image,
                        title: place.name,
                        position: place.geometry.location
                    });

                    markers.push(marker);

                    bounds.extend(place.geometry.location);
                }

                map.fitBounds(bounds);
                map.setZoom(15);
            });
            // [END region_getplaces]

            //// Bias the SearchBox results towards places that are within the bounds of the
            //// current map's viewport.
            //google.maps.event.addListener(map, 'bounds_changed', function () {
            //    var bounds = map.getBounds();
            //    searchBox.setBounds(bounds);
            //});

        }


        scope.$watch(function () {
            return scope.search;
        }, function () {
            initMap();
            // clear markers
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }
            markers = [];

            angular.forEach(scope.search, function (value, key) {
                // a single object in this example could be:
                // { lat: 50, lon: 3, title: "my title", content: "my content" }
                var location = new google.maps.LatLng(value.lat, value.lon);
                setMarker(map, location, value.title, value.content);
            });
        });
        //scope.$watch('searchResult',function (){
        //    for (var i = 0; i < markers.length; i++) {
        //        markers[i].setMap(null);
        //    }
        //    markers = [];
        //
        //    for (var i in scope.searchResult.places){
        //        var location = new google.maps.LatLng(scope.searchResult.places[i].geometry.lat, scope.searchResult.places[i].geometry.long);
        //        setMarker(map, location, scope.searchResult.places[i].name, {});
        //    }
        //});
    };
    var template = function (element, attrs) {
        var mapLocation = attrs.mapLocation || 'search';
        var htmlText = '<div id="gmaps" class="' + mapLocation + '"></div>';
        return htmlText;
    };
    return {
        restrict: 'EA',
        template: template,
        link: link,
        replace: true,
        scope: true
    };
});