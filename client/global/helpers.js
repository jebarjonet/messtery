/**
 * Template helpers
 */
Template.registerHelper('formatDate', function (date) {
    if (!date) {
        return;
    }

    date = moment(date);
    var sameDay = date.isSame(new Date(), 'day');
    var sameYear = date.isSame(new Date(), 'year');

    if (sameDay) {
        return date.format('HH:mm');
    } else if (sameYear) {
        return date.format('DD/MM');
    } else {
        return date.format('DD/MM/YY');
    }
});

Template.registerHelper('isEmpty', function (data) {
    if (!data) {
        return true;
    }

    if (_.isArray(data)) {
        // array
        return !data.length;
    } else {
        // cursor
        return !data.count();
    }
});

/**
 * Function helpers
 */
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
}