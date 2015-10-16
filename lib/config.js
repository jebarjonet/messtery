/**
 * App config
 */
config = {

};

/**
 * Packages
 */
// overriding underscorejs with lodash
_ = lodash;

// SimpleSchema errors overridden
SimpleSchema.messages({
    required: "[label] est obligatoire",
    minString: "[label] doit faire au moins [min] caractères",
    maxString: "[label] ne doit pas dépasser [max] caractères",
    minNumber: "[label] doit valoir [min] au minimum",
    maxNumber: "[label] ne doit pas excéder [max]",
    minDate: "[label] ne peut pas être avant le [min]",
    maxDate: "[label] ne peut pas être après le [max]",
    badDate: "[label] n'est pas une date valide",
    noDecimal: "[label] doit être un entier",
    notAllowed: "[value] n'est pas une valeur autorisée",
    notUnique: "[value] est déjà utilisé",
    notValid: "[label] n'est pas valide",
    passwordMismatch: "Le mot de passe ne correspond pas",
    tooMuchLines: "Tu ne peux pas sauter autant de lignes",
    regEx: [
        {exp: SimpleSchema.RegEx.Email, msg: "[label] doit être une adresse email valide"}
    ]
});

// momentjs config
moment.locale('fr', {
    relativeTime: {
        future: "dans %s",
        past: "il y a %s",
        s: "quelques secondes",
        m: "une minute",
        mm: "%d minutes",
        h: "une heure",
        hh: "%d heures",
        d: "un jour",
        dd: "%d jours",
        M: "un mois",
        MM: "%d mois",
        y: "un an",
        yy: "%d ans"
    },
    week: {
        dow: 1, // Monday is the first day of the week.
        doy: 4  // The week that contains Jan 4th is the first week of the year.
    }
});

if (Meteor.isClient) {
    // Alerts (notifications)
    sAlert.config({
        effect: 'stackslide',
        position: 'bottom',
        onRouteClose: false,
        stack: false
    });

    // Active router
    ActiveRoute.configure({
        caseSensitive: false
    });
}

// server config in server for security