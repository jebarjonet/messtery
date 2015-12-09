PlacesCategories = new Mongo.Collection("placescategories");

PlacesCategoriesSchema = new SimpleSchema({
    name: {
        type: String
    },
    owner: {
        type: String,
        optional: true
    },
    color: {
        type: String,
        max: 7,
        min: 7
    },
    icon: {
        type: String
    }
});

PlacesCategories.before.insert(function (userId, doc) {
    doc.owner = userId;
});

PlacesCategories.allow(ownerAllow('update insert remove'));

PlacesCategories.attachSchema(PlacesCategoriesSchema);