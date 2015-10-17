Template.addFolderHosting.helpers({
    previousFolderAsObject: function() {
        return {
            f: getParentFolder()
        };
    }
});

AutoForm.addHooks('insertHostingFoldersForm', {
    before: {
        insert: function (doc) {
            if (getParentFolder()) {
                doc.parent = getParentFolder();
            }
            return doc;
        }
    },
    onSuccess: function() {
        notification('Folder created', 'success');
        if(getParentFolder()) {
            Router.go('hosting', {}, {
                query: 'f=' + getParentFolder()
            });
        } else {
            Router.go('hosting');
        }
    }
});

function getParentFolder() {
    var parentFolder = Router.current().params.query.f;
    return parentFolder ? parentFolder : undefined;
}