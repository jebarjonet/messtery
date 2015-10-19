validators = {};

validators.limitLines = function(value, nb) {
    if (value.split(/\r\n|\r|\n/).length > nb) {
        return 'tooMuchLines';
    }
};

validators.email = function(value) {
    var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!regex.test(value)) {
        return 'notValid';
    }
};

validators.date = function(value) {
    var regex = new RegExp('^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)[0-9]{2}$');
    if (!regex.test(value)) {
        return 'notValid';
    }
};