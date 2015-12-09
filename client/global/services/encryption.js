EncryptionService = (function () {
    return {
        setupUserEncryptionInfo: setupUserEncryptionInfo,
        changePasswordUserEncryptionInfo: changePasswordUserEncryptionInfo,
        encrypt: encrypt,
        encryptFile: encryptFile,
        decrypt: decrypt,
        decryptFile: decryptFile,
        getPasswordValidator: getPasswordValidator,
        generateDataSalt: generateDataSalt,
        getSessionKeys: getSessionKeys,
        askUserPassword: askUserPassword,
        needSessionKeys: needSessionKeys,
        executePendingFunction: executePendingFunction,
        forgetSessionKeys: forgetSessionKeys
    };

    function setupUserEncryptionInfo(password, key) {
        var encryption = {};

        key = key ? key : generateHexString(32);
        encryption.iv = generateHexString(32);
        encryption.salt = generateHexString(32);
        var passwordValidator = getPasswordValidator(password, encryption.salt);
        var keyEncrypter = passwordValidator[0];
        encryption.passwordValidator = passwordValidator[1];
        encryption.key = CryptoJS.AES.encrypt(key, keyEncrypter, {iv: encryption.iv}).toString();

        return encryption;
    }
    
    function changePasswordUserEncryptionInfo(oldPassword, newPassword) {
        var encryption = Meteor.user().encryption;
        var passwordValidator = getPasswordValidator(oldPassword, encryption.salt);
        var keyEncrypter = passwordValidator[0];
        var key = CryptoJS.AES.decrypt(encryption.key, keyEncrypter, {iv: encryption.iv}).toString(CryptoJS.enc.Utf8);

        if (encryption.passwordValidator !== passwordValidator[1]) {
            notification('Wrong current password');
            return;
        }

        forgetSessionKeys();
        return setupUserEncryptionInfo(newPassword, key);
    }

    /**
     * Encrypt content with user key and data salt
     * @param content
     * @param salt
     * @returns {string}
     */
    function encrypt(content, salt) {
        var encryption = Meteor.user().encryption;
        var passwordValidator = getSessionKeys();

        if (!passwordValidator) {
            notification('Should have decrypted user encryption info before running this function');
            return;
        }

        var keyEncrypter = passwordValidator[0];

        var key = CryptoJS.AES.decrypt(encryption.key, keyEncrypter, {iv: encryption.iv}).toString(CryptoJS.enc.Utf8);
        return CryptoJS.AES.encrypt(content, key + salt).toString();
    }

    function encryptFile(content, salt) {
        var encrypted = encrypt(content, salt);

        if (!encrypted) {
            return;
        }

        var name = generateHexString(32);

        return new File([encrypted], name, {
            type: 'text/plain',
            lastModified: new Date()
        });
    }

    /**
     * Decrypt content with user key and data salt
     * @param content
     * @param salt
     * @returns {string}
     */
    function decrypt(content, salt) {
        var sessionKeys = getSessionKeys();
        if (!sessionKeys) {
            askUserPassword();
            return;
        }

        var encryption = Meteor.user().encryption;
        var passwordValidator = getSessionKeys();

        if (!passwordValidator) {
            notification('Should have decrypted user encryption info before running this function');
            return;
        }

        var keyEncrypter = passwordValidator[0];

        if (encryption.passwordValidator !== passwordValidator[1]) {
            notification('Wrong password while decrypting a file');
            return;
        }

        var key = CryptoJS.AES.decrypt(encryption.key, keyEncrypter, {iv: encryption.iv}).toString(CryptoJS.enc.Utf8);
        return CryptoJS.AES.decrypt(content, key + salt).toString(CryptoJS.enc.Utf8);
    }

    function decryptFile(content, salt) {
        var decryptedFile = decrypt(content, salt);

        if (!/^data:/.test(decryptedFile)) {
            notification('Invalid key or file. Please try again');
            return;
        }

        var splitFileData = decryptedFile.substring(5).split(',');
        var b64FileData = splitFileData[1];
        var fileContentType = splitFileData[0];

        return b64toBlob(b64FileData, fileContentType);
    }

    /**
     * Create Blob from base64 data (optimized by slicing data)
     * @param b64Data
     * @param contentType
     * @param sliceSize
     */
    function b64toBlob(b64Data, contentType, sliceSize) {
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
    }

    /**
     * Generate a string with hex values
     * @param length
     * @returns {string}
     */
    function generateHexString(length) {
        var key = "";
        var hex = "0123456789abcdef";

        for (var i = 0; i < length; i++) {
            key += hex.charAt(Math.floor(Math.random() * hex.length));
        }

        return key;
    }

    /**
     * Return a combination between user password and user salt
     * @param password
     * @param salt
     * @returns {string}
     */
    function userPasswordAndSalt(password, salt) {
        return CryptoJS.EvpKDF(password, salt, {keySize: 16}).toString();
    }

    /**
     * Return the two halves of a string
     * @param passwordValidator
     * @returns {*[]}
     */
    function splitStringInHalf(passwordValidator) {
        var length = passwordValidator.length / 2;
        return [
            passwordValidator.substr(0, length),
            passwordValidator.substr(length)
        ];
    }

    /**
     * Shortcut returning the password validator from the password and the salt
     * @param password
     * @param salt
     * @returns {*|*[]}
     */
    function getPasswordValidator(password, salt) {
        var passwordValidator = userPasswordAndSalt(password, salt);
        return splitStringInHalf(passwordValidator);
    }

    /**
     * Generates a string userd as salt for data encryption (not user side)
     * @returns {*|string}
     */
    function generateDataSalt() {
        return generateHexString(32);
    }

    /**
     * Return session info needed for encryption
     * @returns {*}
     */
    function getSessionKeys() {
        return Session.get('passwordValidator');
    }

    /**
     * Open a modal asking for user password
     */
    function askUserPassword() {
        Modal.show('enterPasswordModal');
    }

    /**
     * Pass a function that needs session info after session info is calculated
     * @param cb
     */
    function needSessionKeys(cb) {
        EncryptionService.pendingFunction = cb;
        if (!getSessionKeys()) {
            askUserPassword();
        } else {
            executePendingFunction();
        }
    }

    /**
     * Execute the pending function previously passed in needSessionKeys() if exists
     */
    function executePendingFunction() {
        if (_.isFunction(EncryptionService.pendingFunction)) {
            EncryptionService.pendingFunction();
            EncryptionService.pendingFunction = undefined;
        }
    }

    /**
     * Forget the current session info
     */
    function forgetSessionKeys() {
        Session.set('passwordValidator', undefined);
    }
})();