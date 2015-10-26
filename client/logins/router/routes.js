Router.map(function () {
    this.route('/logins', {
        waitOn: sub
    });
    this.route('/logins/add', {
        name: 'logins.add'
    });
});

function sub() {
    return Meteor.subscribe('logins');
}