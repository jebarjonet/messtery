Meteor.publish('accounts', function () {
    return [
        Meteor.users.find({}, {
            fields: {
                emails: 1,
                createdAt: 1,
                lastConnectionAt: 1,
                roles: 1,
                isActivated: 1
            }
        })
    ];
});