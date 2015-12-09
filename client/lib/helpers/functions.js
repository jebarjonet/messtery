// show a client notification
notification = function (text, type, options) {
    type = type ? type : 'error';
    if (!_.includes('error warning info success'.split(' '), type)) {
        throw new Meteor.Error('wrong-alert-type', type + ' is not a valid alert type');
    }

    options = options || {};

    if (!options.timeout) {
        var wordsPerMinute = 300;
        var readingTime = _.words(text).length * 60000 / wordsPerMinute;
        options.timeout = _.max([2000, readingTime]);
    }

    return sAlert[type](text, options);
};

// format bytes to kilo/mega/etc. format
formatBytes = function (bytes, decimals) {
    if (bytes == 0) {
        return '0 Byte';
    }
    var k = 1000;
    var dm = decimals + 1 || 3;
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    var i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toPrecision(dm) + ' ' + sizes[i];
};

// check if (current user or passed userId) is admin
isAdmin = function (user_or_userId) {
    var user = _.isObject(user_or_userId) ? user_or_userId : (user_or_userId ? Meteor.users.findOne(user_or_userId) : Meteor.user());
    return user && user.roles && _.includes(user.roles, 'admin');
};

// returns the parent template view searched by name according to current view
// getInstance : if true, returns the template instance of found view
// ex: on Autoform hook in modal : findParentTemplate('updateLoginModal', this.template, true) returns the modal instance
findParentTemplate = function (name, currentView, getInstance) {
    if (!name || !currentView) {
        return undefined;
    }

    if (currentView.view) {
        currentView = currentView.view;
    }

    if (!currentView.parentView) {
        return undefined;
    } else if (currentView.parentView.name === 'Template.' + name) {
        return getInstance ? currentView.parentView.templateInstance() : currentView.parentView;
    } else {
        return findParentTemplate(name, currentView.parentView, getInstance);
    }
};