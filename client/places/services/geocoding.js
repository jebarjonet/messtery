GeocodingService = (function () {
    return {
        geocode: geocode
    };

    /**
     * Returns coordinates and formatted adress of passed address to a callback
     * @param address
     * @param cb
     */
    function geocode(address, cb) {
        if (!Meteor.settings.public.googleApiKey) {
            throw new Meteor.Error(403, "Google API key is needed in Meteor settings");
        }

        if (!address) {
            throw new Meteor.Error(403, "No address provided");
        }

        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + Meteor.settings.public.googleApiKey;
        HTTP.get(url, function (err, res) {
            var error = err ? err : res.data.error_message ? res.data.error_message : res.data.results.length ? undefined : res.data.status;

            if (error) {
                if (error === "ZERO_RESULTS") {
                    error = "No result found for this address";
                }

                notification(error);
                return;
            }

            var result = res.data.results[0];
            var location = result.geometry.location;
            location.address = result.formatted_address;

            cb(location);
        });
    }
})();