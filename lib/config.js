/**
 * App config
 */
appConfig = {
    fileMaxSize: 26214400,
    defaultMapCoordinates: {
        lat: 48.856874,
        lng: 2.336285
    }
};

/**
 * Packages
 */
// overriding underscorejs with lodash
_ = lodash;

// SimpleSchema custom errors
SimpleSchema.messages({
    notValid: "[label] is not valid",
    passwordMismatch: "The two passwords mismatch",
    tooMuchLines: "[label] should not have so much line breaks"
});