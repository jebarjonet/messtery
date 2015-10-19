var fakePassword = 'monmdp';

EncryptionService = {
    setupUserEncryption: function (password, key) {
        var encryption = {};

        key = key ? key : EncryptionService.generateHexString(128);
        encryption.iv = EncryptionService.generateHexString(128);
        encryption.salt = EncryptionService.generateHexString(64);
        var passwordValidator = EncryptionService.getPasswordValidator(password, encryption.salt);
        var keyEncrypter = passwordValidator[0];
        encryption.passwordValidator = passwordValidator[1];
        encryption.key = CryptoJS.AES.encrypt(key, keyEncrypter, {iv: encryption.iv}).toString();

        return encryption;
    },
    changePasswordUserEncryption: function (newPassword) {
        var encryption = Meteor.user().encryption;
        var passwordValidator = EncryptionService.getPasswordValidator(fakePassword, encryption.salt);
        var keyEncrypter = passwordValidator[0];

        return EncryptionService.setupUserEncryption(newPassword, keyEncrypter);
    },
    encryptFile: function (content) {
        var encryption = Meteor.user().encryption;
        var passwordValidator = EncryptionService.getPasswordValidator(fakePassword, encryption.salt);
        var keyEncrypter = passwordValidator[0];

        var key = CryptoJS.AES.decrypt(encryption.key, keyEncrypter, {iv: encryption.iv}).toString(CryptoJS.enc.Latin1);
        var encrypted = CryptoJS.AES.encrypt(content, key).toString();
        var name = (Math.random() + 1).toString(36).substring(15);

        return new File([encrypted], name, {
            type: 'text/plain',
            lastModified: new Date()
        });
    },
    decryptFile: function (content) {
        var encryption = Meteor.user().encryption;
        var passwordValidator = EncryptionService.getPasswordValidator(fakePassword, encryption.salt);
        var keyEncrypter = passwordValidator[0];

        if (encryption.passwordValidator !== passwordValidator[1]) {
            notification('Wrong password while decrypting a file');
            return;
        }

        var key = CryptoJS.AES.decrypt(encryption.key, keyEncrypter, {iv: encryption.iv}).toString(CryptoJS.enc.Latin1);
        var decryptedFile = CryptoJS.AES.decrypt(content, key).toString(CryptoJS.enc.Latin1);

        if (!/^data:/.test(decryptedFile)) {
            notification('Invalid pass phrase or file. Please try again.');
            return;
        }

        var splitFileData = decryptedFile.substring(5).split(',');
        var b64FileData = splitFileData[1];
        var fileContentType = splitFileData[0];

        return EncryptionService.b64toBlob(b64FileData, fileContentType);
    },
    /**
     * Creates Blob from base64 data (optimized by slicing data)
     * @param b64Data
     * @param contentType
     * @param sliceSize
     */
    b64toBlob: function (b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, {type: contentType});
    },
    /**
     * Generates a string with hex values
     * @param length
     * @returns {string}
     */
    generateHexString: function (length) {
        var key = "";
        var hex = "0123456789abcdef";

        for (var i = 0; i < length; i++) {
            key += hex.charAt(Math.floor(Math.random() * hex.length));
        }

        return key;
    },
    /**
     * returns a combination between the password and the salt
     * @param password
     * @param salt
     * @returns {string}
     */
    passwordAndSalt: function (password, salt) {
        return CryptoJS.EvpKDF(password, salt, {keySize: 256 / 8}).toString();
    },
    /**
     * Returns the two halves of a string
     * @param passwordValidator
     * @returns {*[]}
     */
    splitStringInHalf: function (passwordValidator) {
        var length = passwordValidator.length / 2;
        return [
            passwordValidator.substr(0, length),
            passwordValidator.substr(length)
        ];
    },
    /**
     * Shortcut returning the password validator from the password and the salt
     * @param password
     * @param salt
     * @returns {*|*[]}
     */
    getPasswordValidator: function (password, salt) {
        var passwordValidator = EncryptionService.passwordAndSalt(password, salt);
        return EncryptionService.splitStringInHalf(passwordValidator);
    }
};