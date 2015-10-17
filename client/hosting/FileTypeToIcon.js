Template.registerHelper('fileTypeToIcon', function() {
    var file = this.file;
    var icon = _.find(FileTypeToIcon, function(data) {
        return ~data.types.indexOf(file.original.type);
    });
    return icon ? icon : {icon: 'file', title: 'File'};
});

FileTypeToIcon = [
    {
        types: [
            'application/x-compressed',
            'application/x-zip-compressed',
            'application/x-rar-compressed',
            'application/x-7z-compressed',
            'application/zip',
            'multipart/x-zip'
        ],
        icon: 'archive',
        title: 'Compressed'
    },
    {
        types: [
            'image/jpeg',
            'image/png',
            'image/bmp',
            'image/gif'
        ],
        icon: 'picture-o',
        title: 'Image'
    },
    {
        types: [

        ],
        icon: 'film',
        title: 'Movie'
    },
    {
        types: [

        ],
        icon: 'film',
        title: 'Music'
    }
];