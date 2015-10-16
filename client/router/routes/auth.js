/**
 * Auth
 */

Router.map(function() {
    this.route('/login');
    this.route('/register');
    this.route('/forgot-password', {
        name: 'forgotPassword'
    });
    this.route('/verify-email/:token', {
        //controller: 'VerifyEmailController',
        name: 'verifyEmail'
    });
    this.route('/reset-password/:token', {
        name: 'resetPassword'
    });
});