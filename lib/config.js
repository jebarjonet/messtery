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

// forbid accounts creation on client
Accounts.config({
    forbidClientAccountCreation : true
});