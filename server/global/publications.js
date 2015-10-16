Meteor.publish(null, function () {
    return Files.find();
});