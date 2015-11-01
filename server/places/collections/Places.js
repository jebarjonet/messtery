Places = new Mongo.Collection("places");

PlacesSchema = new SimpleSchema({
    name: {
        type: String
    },
    category: {
        type: String
    },
    text: {
        type: String,
        optional: true
    },
    address: {
        type: String
    },
    lat: {
        type: String
    },
    lng: {
        type: String
    }
});

Places.allow(adminAllow('update insert remove'));

Places.attachSchema(PlacesSchema);