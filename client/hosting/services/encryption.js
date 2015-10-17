EncryptionService = {
    encryptFile: function (content, passphrase) {
        var encrypted = CryptoJS.AES.encrypt(content, passphrase);
        var name = (Math.random() + 1).toString(36).substring(15);

        return new File([encrypted], name, {
            type: 'text/plain',
            lastModified: new Date()
        });
    },
    decryptFile: function (content, passphrase) {
        var decrypted = CryptoJS.AES.decrypt(content, passphrase).toString(CryptoJS.enc.Latin1);

        if (!/^data:/.test(decrypted)) {
            notification('Invalid pass phrase or file. Please try again.');
            return;
        }

        var splitData = decrypted.substring(5).split(',');
        var b64Data = splitData[1];
        var contentType = splitData[0];

        return EncryptionService.b64toBlob(b64Data, contentType);
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
    }
};