EncryptionService = {
    setupUserEncryptionInfo: function (password, key) {
        var encryption = {};

        key = key ? key : EncryptionService.generateHexString(32);
        encryption.iv = EncryptionService.generateHexString(32);
        encryption.salt = EncryptionService.generateHexString(32);
        var passwordValidator = EncryptionService.getPasswordValidator(password, encryption.salt);
        var keyEncrypter = passwordValidator[0];
        encryption.passwordValidator = passwordValidator[1];
        encryption.key = CryptoJS.AES.encrypt(key, keyEncrypter, {iv: encryption.iv}).toString();

        return encryption;
    },
    changePasswordUserEncryptionInfo: function (oldPassword, newPassword) {
        var encryption = Meteor.user().encryption;
        var passwordValidator = EncryptionService.getPasswordValidator(oldPassword, encryption.salt);
        var keyEncrypter = passwordValidator[0];
        var key = CryptoJS.AES.decrypt(encryption.key, keyEncrypter, {iv: encryption.iv}).toString(CryptoJS.enc.Latin1);

        if (encryption.passwordValidator !== passwordValidator[1]) {
            notification('Wrong current password');
            return;
        }

        EncryptionService.forgetSessionKeys();
        return EncryptionService.setupUserEncryptionInfo(newPassword, key);
    },
    /**
     * Encrypt content with user key and data salt
     * @param content
     * @param salt
     * @returns {string}
     */
    encrypt: function (content, salt) {
        var encryption = Meteor.user().encryption;
        var passwordValidator = EncryptionService.getSessionKeys();

        if (!passwordValidator) {
            notification('Should have decrypted user encryption info before running this function');
            return;
        }

        var keyEncrypter = passwordValidator[0];

        var key = CryptoJS.AES.decrypt(encryption.key, keyEncrypter, {iv: encryption.iv}).toString(CryptoJS.enc.Latin1);
        return CryptoJS.AES.encrypt(content, key + salt).toString();
    },
    encryptFile: function (content, salt) {
        var encrypted = EncryptionService.encrypt(content, salt);

        if (!encrypted) {
            return;
        }

        var name = EncryptionService.generateHexString(32);

        return new File([encrypted], name, {
            type: 'text/plain',
            lastModified: new Date()
        });
    },
    /**
     * Decrypt content with user key and data salt
     * @param content
     * @param salt
     * @returns {string}
     */
    decrypt: function (content, salt) {
        var sessionKeys = EncryptionService.getSessionKeys();
        if (!sessionKeys) {
            EncryptionService.askUserPassword();
            return;
        }

        var encryption = Meteor.user().encryption;
        var passwordValidator = EncryptionService.getSessionKeys();

        if (!passwordValidator) {
            notification('Should have decrypted user encryption info before running this function');
            return;
        }

        var keyEncrypter = passwordValidator[0];

        if (encryption.passwordValidator !== passwordValidator[1]) {
            notification('Wrong password while decrypting a file');
            return;
        }

        var key = CryptoJS.AES.decrypt(encryption.key, keyEncrypter, {iv: encryption.iv}).toString(CryptoJS.enc.Latin1);
        return CryptoJS.AES.decrypt(content, key + salt).toString(CryptoJS.enc.Latin1);
    },
    decryptFile: function (content, salt) {
        var decryptedFile = EncryptionService.decrypt(content, salt);

        if (!/^data:/.test(decryptedFile)) {
            notification('Invalid key or file. Please try again');
            return;
        }

        var splitFileData = decryptedFile.substring(5).split(',');
        var b64FileData = splitFileData[1];
        var fileContentType = splitFileData[0];

        return EncryptionService.b64toBlob(b64FileData, fileContentType);
    },
    /**
     * Create Blob from base64 data (optimized by slicing data)
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
     * Generate a string with hex values
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
     * Return a combination between user password and user salt
     * @param password
     * @param salt
     * @returns {string}
     */
    userPasswordAndSalt: function (password, salt) {
        return CryptoJS.EvpKDF(password, salt, {keySize: 16}).toString();
    },
    /**
     * Return the two halves of a string
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
        var passwordValidator = EncryptionService.userPasswordAndSalt(password, salt);
        return EncryptionService.splitStringInHalf(passwordValidator);
    },
    /**
     * Generates a string userd as salt for data encryption (not user side)
     * @returns {*|string}
     */
    generateDataSalt: function () {
        return EncryptionService.generateHexString(32);
    },
    /**
     * Return session info needed for encryption
     * @returns {any}
     */
    getSessionKeys: function () {
        return Session.get('passwordValidator');
    },
    /**
     * Open a modal asking for user password
     */
    askUserPassword: function () {
        Modal.show('enterPasswordModal');
    },
    /**
     * Pass a function that needs session info after session info is calculated
     * @param cb
     */
    needSessionKeys: function (cb) {
        EncryptionService.pendingFunction = cb;
        if (!EncryptionService.getSessionKeys()) {
            EncryptionService.askUserPassword();
        } else {
            EncryptionService.executePendingFunction();
        }
    },
    /**
     * Execute the pending function previously passed in needSessionKeys() if exists
     */
    executePendingFunction: function () {
        if (_.isFunction(EncryptionService.pendingFunction)) {
            EncryptionService.pendingFunction();
            EncryptionService.pendingFunction = undefined;
        }
    },
    /**
     * Forget the current session info
     */
    forgetSessionKeys: function () {
        Session.set('passwordValidator', undefined);
    },
    /**
     * Store the pending function passed in needSessionKeys()
     */
    pendingFunction: undefined
};