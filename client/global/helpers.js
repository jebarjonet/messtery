// show a client notification
notification = function(text, type, options) {
    type = type ? type : 'error';
    if (!_.includes('error warning info success'.split(' '), type)) {
        throw new Meteor.Error('wrong-alert-type', type + ' is not a valid alert type');
    }

    options = options || {};
    var wordsPerMinute = 300;
    var readingTime = _.words(text).length * 60000 / wordsPerMinute;
    options.timeout = _.max([2000, readingTime]);

    sAlert[type](text, options);
};