var OnBeforeActions = {
    isLoggedIn: function () {
        if (!Meteor.userId()) {
            this.redirect('login');
        } else {
            this.next();
        }
    },
    isAdmin: function () {
        if (Meteor.user() && isAdmin(Meteor.user())) {
            this.next();
        } else {
            this.redirect('index');
        }
    }
};

Router.onBeforeAction(OnBeforeActions.isLoggedIn, {
    except: 'index login boarding forgotPassword verifyEmail resetPassword'.split(' ')
});

Router.onBeforeAction(OnBeforeActions.isAdmin, {
    only: 'accounts.enroll'.split(' ')
});