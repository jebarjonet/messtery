Router.map(function () {
    this.route('/logins', {
        waitOn: sub
    });
});

function sub() {
    return Meteor.subscribe('logins');
}