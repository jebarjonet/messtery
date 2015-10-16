Router.map(function() {
    this.route('/hosting');
    this.route('/hosting/search/:query', {
        name: 'searchHosting'
    });
    this.route('/hosting/:folder', {
        name: 'listHosting'
    });
});