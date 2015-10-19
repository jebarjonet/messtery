Router.map(function () {
    this.route('/accounts', {
        waitOn: sub,
        data: function() {
            return Meteor.users.find();
        }
    });
});

function sub() {
    return Meteor.subscribe('accounts');
}