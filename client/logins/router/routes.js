Router.map(function () {
    this.route('/logins', {
        waitOn: sub,
        data: function () {
            return Logins.find({}, {
                sort: {
                    domain: 1
                }
            });
        }
    });
    this.route('/logins/add', {
        name: 'logins.add'
    });
});

function sub() {
    return Meteor.subscribe('logins');
}