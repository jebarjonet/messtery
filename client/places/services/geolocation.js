GeolocationService = (function () {
    return {
        locate: locate,
        findNearbyBoundaries: findNearbyBoundaries,
        isGeolocationAvailable: isGeolocationAvailable
    };

    /**
     * Geolocates the user and returns its current latitude and longitude
     * @param cb
     */
    function locate(cb) {
        if (isGeolocationAvailable()) {
            navigator.geolocation.getCurrentPosition(function (data) {
                var location = {
                    lat: data.coords.latitude.toFixed(6),
                    lng: data.coords.longitude.toFixed(6)
                };

                if (cb) {
                    cb(location);
                }
            }, function (error) {
                var message = _.isObject(error) ? error.message : error;

                if (!message) {
                    message = "Your location is not available for now";
                }

                notification(message, "error");
                cb();
            });
        } else {
            console.error("Geolocation is not supported by your browser");
        }
    }

    /**
     * Finds boundaries forming a square around the passed location (with distance parameter radius)
     * @param location
     * @param distance (in km)
     * @returns {Array}
     */
    function findNearbyBoundaries(location, distance) {
        var distances = {
            lat: distance * 0.008992,
            lng: distance * 0.014143
        };

        // get coordinates of polygon to search in
        var boundaries = [];
        _.forEach(["lat", "lng"], function (c) {
            boundaries[c] = {
                min: parseFloat(location[c]) - distances[c],
                max: parseFloat(location[c]) + distances[c]
            };
        });

        return boundaries;
    }

    /**
     * Returns true if browser geolocation is available
     * @returns {boolean}
     */
    function isGeolocationAvailable() {
        return !!navigator.geolocation;
    }
})();