Places = new Mongo.Collection("places");

PlacesSchema = new SimpleSchema({
    name: {
        type: String
    },
    owner: {
        type: String,
        optional: true
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

Places.before.insert(function (userId, doc) {
    doc.owner = userId;
});

Places.allow(ownerAllow('update insert remove'));

Places.attachSchema(PlacesSchema);