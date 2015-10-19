Router.map(function() {
    this.route('/login');
    this.route('/forgot-password', {
        name: 'forgotPassword'
    });
    this.route('/verify-email/:token', {
        //controller: 'VerifyEmailController',
        name: 'verifyEmail'
    });
    this.route('/boarding/:token', {
        name: 'boarding',
        waitOn: function() {
            return Meteor.subscribe('boarding', this.params.token);
        }
    });
    this.route('/reset-password/:token', {
        name: 'resetPassword'
    });
});