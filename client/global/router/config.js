var routerConfig = {
    // Iron Router
    layoutTemplate: 'layout',
    notFoundTemplate: 'notFound',
    // Loader
    progressDelay: 200,
    progressSpinner: false
};

Router.configure(routerConfig);

Router.setTemplateNameConverter(function(str) {
    var newName = str.split('.');

    if (newName.length === 1) {
        return str;
    }

    return _.camelCase(newName.reverse().join(' '));
});