Template.moveHostingModal.helpers({
    foldersTree: function () {
        return findChildren(null, this);
    }
});

Template.moveHostingModalChild.helpers({
    levelPadding: function () {
        var padder = '-';
        return _.padLeft('', this.level * padder.length, padder);
    }
});

Template.moveHostingModal.events({
    'click a': function (e) {
        e.preventDefault();
        var target = $(e.target).data('target');
        var object = Template.currentData();

        var Entity = object.isFolder ? HostingFolders : HostingFiles;
        var update = target ? {
            $set: {
                parent: target
            }
        } : {
            $unset: {
                parent: ""
            }
        };
        Entity.update({
            _id: object._id
        }, update, function (err) {
            if (!err) {
                Modal.hide()
            }
        });
    }
});

function findChildren(parent, selectedObject) {
    var query = {
        $and: []
    };

    if (parent) {
        query.$and.push({
            parent: parent._id
        });
    } else {
        query.$and.push({
            parent: {
                $exists: false
            }
        });
    }

    // if folder can not select itself or its children
    if (selectedObject.isFolder) {
        query.$and.push({
            _id: {
                $ne: selectedObject._id
            }
        });
        query.$and.push({
            parent: {
                $ne: selectedObject._id
            }
        });
    }

    var children = HostingFolders.find(query, {
        sort: {
            name: 1
        }
    }).fetch();

    _.forEach(children, function (folder, index) {
        children[index].level = _.has(parent, 'level') ? parent.level + 1 : 0;
        children[index].currentParent = folder._id === selectedObject.parent;
        children[index] = findChildren(folder, selectedObject);
    });

    if (parent) {
        parent.children = children;
    } else {
        parent = children;
    }

    return parent;
}