Meteor.methods({
    // delete an object (folder or file) from database
    removeHostingObject: function (doc) {
        onlyUsers();

        // check ownership
        var object = doc.isFolder ? HostingFolders.findOne(doc._id) : HostingFiles.findOne(doc._id);
        if (object.owner !== Meteor.userId()) {
            throw new Meteor.Error(403, "You can not delete something that is not yours");
        }

        if (doc.isFolder) {
            var children = findChildren(object._id);

            // recursively delete all folders in this folder
            var query = {$or: []};
            _.forEach(children.folders, function (folder) {
                query.$or.push(folder._id);
            });
            query.$or.push(object._id);
            HostingFolders.remove(query);

            // recursively delete all files in this folder
            deleteFiles(children.files);
        } else {
            deleteFiles(object);
        }
    }
});

/**
 * Find children (folders and files) of a parent folder
 * @param parentId
 * @returns {{folders: *, files: *}}
 */
function findChildren(parentId) {
    var query = {
        parent: parentId
    };

    var folders = HostingFolders.find(query).fetch();
    var files = HostingFiles.find(query).fetch();

    var children = [];
    _.forEach(folders, function (folder) {
        children.push(findChildren(folder._id));
    });
    folders = folders.concat(_.pluck(children, 'folders'));
    files = files.concat(_.pluck(children, 'files'));

    return {
        folders: _.flattenDeep(folders),
        files: _.flattenDeep(files)
    };
}

function deleteFiles(hostingFiles) {
    hostingFiles = _.isArray(hostingFiles) ? hostingFiles : [hostingFiles];

    if (!hostingFiles.length) {
        return;
    }

    var queryFiles = {$or: []};
    var queryHostingFiles = {$or: []};
    _.forEach(hostingFiles, function (hostingFile) {
        queryFiles.$or.push(hostingFile.file._id ? hostingFile.file._id : hostingFile.file);
        queryHostingFiles.$or.push(hostingFile._id);
    });

    Files.remove(queryFiles);
    HostingFiles.remove(queryHostingFiles);
}