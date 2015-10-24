Router.map(function () {
    this.route('/accounts', {
        waitOn: sub,
        data: function () {
            return Meteor.users.find({}, {
                sort: {
                    createdAt: 1
                }
            });
        }
    });
});

function sub() {
    return Meteor.subscribe('accounts');
}