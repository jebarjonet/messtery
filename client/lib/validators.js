Validators = {};

Validators.limitLines = function (nb, value) {
    if (value.split(/\r\n|\r|\n/).length > nb) {
        return 'tooMuchLines';
    }
};

Validators.email = function () {
    var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (!regex.test(this.value)) {
        return 'notValid';
    }
};

Validators.date = function () {
    var regex = new RegExp('^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)[0-9]{2}$');
    if (!regex.test(this.value)) {
        return 'notValid';
    }
};