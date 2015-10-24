Template.submitIfSessionKeys.helpers({
    needsSessionKeys: function () {
        return needSessionKeys();
    },
    submitButtonDisabled: function () {
        return needSessionKeys() ? 'disabled' : '';
    }
});

Template.submitIfSessionKeys.events({
    'click .set-session-keys-action': function () {
        EncryptionService.needSessionKeys();
    }
});

function needSessionKeys() {
    return !EncryptionService.getSessionKeys()
}