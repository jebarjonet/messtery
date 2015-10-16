var OnBeforeActions = {
    isLoggedIn: function () {
        if (!Meteor.userId()) {
            this.redirect('login');
        } else {
            this.next();
        }
    }
};

/*
 Router.onBeforeAction(OnBeforeActions.isLoggedIn, {
 except: 'index login register forgotPassword verifyEmail resetPassword'.split(' ')
 });
 */