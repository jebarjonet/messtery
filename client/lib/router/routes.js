var privateRoutes = FlowRouter.group({
        triggersEnter: [function () {
            if (!Meteor.userId()) {
                FlowFlowRouter.go("login");
            }
        }]
    }),
    adminRoutes = FlowRouter.group({
        prefix: "/admin",
        triggersEnter: [function () {
            if (!Meteor.userId()) {
                if (!(Meteor.userId() && isAdmin(Meteor.user()))) {
                    FlowFlowRouter.go("login");
                }
            }
        }]
    });

FlowRouter.route("/", {
    name: "index",
    action: function () {
        BlazeLayout.render("layout", {main: "index"});
    }
});

// auth
FlowRouter.route("/login", {
    name: "login",
    action: function () {
        BlazeLayout.render("layout", {main: "login"});
    }
});

FlowRouter.route("/boarding/:token", {
    name: "boarding",
    action: function () {
        BlazeLayout.render("layout", {main: "boarding"});
    }
});

// accounts
privateRoutes.route("/accounts", {
    name: "accounts",
    action: function () {
        BlazeLayout.render("layout", {main: "accounts"});
    }
});

adminRoutes.route("/accounts/enroll", {
    name: "accounts.enroll",
    action: function () {
        BlazeLayout.render("layout", {main: "enrollAccounts"});
    }
});

// hosting
privateRoutes.route("/hosting", {
    name: "hosting",
    action: function () {
        BlazeLayout.render("layout", {main: "hosting"});
    }
});

privateRoutes.route("/hosting/add-folder", {
    name: "hosting.addFolder",
    action: function () {
        BlazeLayout.render("layout", {main: "addFolderHosting"});
    }
});

privateRoutes.route("/hosting/add-file", {
    name: "hosting.addFile",
    action: function () {
        BlazeLayout.render("layout", {main: "addFileHosting"});
    }
});

privateRoutes.route("/hosting/search/:terms", {
    name: "hosting.search",
    action: function () {
        BlazeLayout.render("layout", {main: "hosting"});
    }
});

// logins
privateRoutes.route("/logins", {
    name: "logins",
    action: function () {
        BlazeLayout.render("layout", {main: "logins"});
    }
});

privateRoutes.route("/logins/add", {
    name: "logins.add",
    action: function () {
        BlazeLayout.render("layout", {main: "addLogins"});
    }
});

// places
privateRoutes.route("/places", {
    name: "places",
    action: function () {
        BlazeLayout.render("layout", {main: "places"});
    }
});

privateRoutes.route("/places/nearby", {
    name: "places.nearby",
    action: function () {
        BlazeLayout.render("layout", {main: "nearbyPlaces"});
    }
});

privateRoutes.route("/places/add", {
    name: "places.add",
    action: function () {
        BlazeLayout.render("layout", {main: "placesForm"});
    }
});

privateRoutes.route("/places/edit/:id", {
    name: "places.edit",
    action: function () {
        BlazeLayout.render("layout", {main: "placesForm"});
    }
});

privateRoutes.route("/places/categories", {
    name: "places.categories",
    action: function () {
        BlazeLayout.render("layout", {main: "categoriesPlaces"});
    }
});

privateRoutes.route("/places/categories/add", {
    name: "places.categories.add",
    action: function () {
        BlazeLayout.render("layout", {main: "addCategoriesPlaces"});
    }
});

//profile
privateRoutes.route("/profile", {
    name: "profile",
    action: function () {
        BlazeLayout.render("layout", {main: "profile"});
    }
});