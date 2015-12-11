Template.index.helpers({
    uses: function () {
        return [
            {
                icon: "files-o",
                title: "Files",
                description: "Files hosting kept private to owner. They can be encrypted to ensure better data privacy."
            },
            {
                icon: "unlock-alt",
                title: "Logins",
                description: "\"Hard to remember\" identifiers and passwords are kept encrypted in database. Simple secured memo."
            },
            {
                icon: "map-marker",
                title: "Places",
                description: "Places needing their memo, maybe an address, a door code or even contact location."
            },
            {
                icon: "users",
                title: "Accounts",
                description: "Multiple users can have their own accounts and interact with their own data."
            }
        ];
    },
    features: function () {
        return [
            {
                icon: "envelope",
                title: "Enroll users",
                description: "The ability to invite new users by sending them a enrollment email."
            },
            {
                icon: "legal",
                title: "Roles",
                description: "Users are limited in their actions to their own data. The admin only has the extra option of managing every users."
            },
            {
                icon: "lock",
                title: "Encryption",
                description: "Each secured content is encrypted using a AES-256 algorithm with data unique salt + 128 bits user key, itself encrypted using user password, salt and IV."
            }
        ];
    },
    forgetSessionKeysDisabled: function () {
        return EncryptionService.getSessionKeys() ? '' : 'disabled';
    }
});

Template.index.events({
    'click #forget-session-keys': function () {
        EncryptionService.forgetSessionKeys();
    }
});