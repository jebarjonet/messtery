Router.route('/boot', function () {
    this.response.end(Meteor.call('bootApp'));
}, {where: 'server'});