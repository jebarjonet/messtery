Router.route('/boot', function () {
    this.response.end(Meteor.call('bootApp'));
}, {where: 'server'});

Router.route('/migrate', function () {
    disabledMethod();
    
    this.response.end(Meteor.call('migrateV2'));
}, {where: 'server'});