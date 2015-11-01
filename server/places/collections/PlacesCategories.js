PlacesCategories = new Mongo.Collection("placescategories");

PlacesCategoriesSchema = new SimpleSchema({
    name: {
        type: String
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

PlacesCategories.allow(adminAllow('update insert remove'));

PlacesCategories.attachSchema(PlacesCategoriesSchema);