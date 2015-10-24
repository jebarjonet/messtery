Template.registerHelper('fileTypeToIcon', function () {
    if (this.encrypted) {
        return {icon: 'lock', title: 'Encrypted'};
    }

    var file = this.file;
    var icon = _.find(FileTypeToIconConfig, function (data) {
        return ~data.types.indexOf(file.type());
    });
    return icon ? icon : {icon: 'file-o', title: 'File'};
});

FileTypeToIconConfig = [
    {
        types: [
            'application/x-compressed',
            'application/x-zip-compressed',
            'application/x-rar-compressed',
            'application/x-7z-compressed',
            'application/zip',
            'multipart/x-zip'
        ],
        icon: 'file-archive-o',
        title: 'Compressed'
    },
    {
        types: [
            'image/jpeg',
            'image/png',
            'image/bmp',
            'image/gif'
        ],
        icon: 'file-image-o',
        title: 'Image'
    },
    {
        types: [
            'video/mpeg',
            'video/mp4',
            'video/quicktime',
            'video/x-ms-wmv',
            'video/x-msvideo',
            'video/x-flv',
            'video/webm',
            'video/x-matroska'
        ],
        icon: 'file-video-o',
        title: 'Video'
    },
    {
        types: [
            'audio/mp3',
            'audio/mpeg',
            'audio/x-ms-wma',
            'audio/x-wav'
        ],
        icon: 'file-audio-o',
        title: 'Audio'
    },
    {
        types: [
            'application/mspowerpoint',
            'application/vnd.ms-powerpoint',
            'application/x-mspowerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/vnd.openxmlformats-officedocument.presentationml.slide',
            'application/vnd.openxmlformats-officedocument.presentationml.slideshow',
            'application/vnd.openxmlformats-officedocument.presentationml.template',
            'application/vnd.oasis.opendocument.presentation',
            'application/vnd.oasis.opendocument.presentation-template',
            'application/vnd.oasis.opendocument.spreadsheet',
            'application/vnd.oasis.opendocument.spreadsheet-template'
        ],
        icon: 'file-powerpoint-o',
        title: 'Presentation'
    },
    {
        types: [
            'application/vnd.ms-excel',
            'application/vnd.ms-excel.addin.macroenabled.12',
            'application/vnd.ms-excel.sheet.binary.macroenabled.12',
            'application/vnd.ms-excel.template.macroenabled.12',
            'application/vnd.ms-excel.sheet.macroenabled.12',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.template',
            'text/csv'
        ],
        icon: 'file-excel-o',
        title: 'Spreadsheet'
    },
    {
        types: [
            'application/vnd.oasis.opendocument.text',
            'application/vnd.oasis.opendocument.text-master',
            'application/vnd.oasis.opendocument.text-template',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.template',
            'application/msword',
            'text/plain'
        ],
        icon: 'file-text-o',
        title: 'Text'
    },
    {
        types: [
            'application/pdf'
        ],
        icon: 'file-pdf-o',
        title: 'PDF'
    },
    {
        types: [
            'text/html',
            'text/css',
            'application/javascript',
            'application/json'
        ],
        icon: 'file-code-o',
        title: 'Code'
    }
];