GeocodingService = {
    geocode: function (address, cb) {
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
                notification(error);
                return;
            }

            var location = res.data.results[0].geometry.location;

            cb(location);
        });
    }
};