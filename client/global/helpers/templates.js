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
    } else if (_.isArray(data)) {
        // array
        return !data.length;
    } else {
        // cursor
        return !data.count();
    }
});

Template.registerHelper('pluralize', function(value) {
    return _.isNumber(value) && value > 1 ? 's' : '';
});