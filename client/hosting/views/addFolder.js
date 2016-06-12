Template.addFolderHosting.onCreated(function() {
    this.subscribe('hosting');
});

Template.addFolderHosting.helpers({
    previousFolderAsObject: function () {
        return getParentFolder() ? {f: getParentFolder()} : {};
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
            FlowRouter.go('hosting', {}, {
                f: getParentFolder()
            });
        } else {
            FlowRouter.go('hosting');
        }
    }
});

function getParentFolder() {
    var parentFolder = FlowRouter.getQueryParam("f");
    return parentFolder ? parentFolder : undefined;
}