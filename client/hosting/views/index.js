Template.hosting.helpers({
    breadcrumbs: function () {
        return generateBreadcrumbs(getCurrentFolder());
    },
    children: function () {
        var options = {
            sort: {
                name: 1
            }
        };
        var query = {};

        if (isSearching()) {
            query = {
                name: {
                    $regex: getCurrentSearchQuery(),
                    $options: "i"
                }
            };
        } else {
            var currentFolder = getCurrentFolder();
            if (currentFolder) {
                query.parent = currentFolder
            } else {
                query.parent = {
                    $exists: false
                };
            }
        }

        var hostingFolders = HostingFolders.find(query, options).fetch();
        var hostingFiles = HostingFiles.find(query, options).fetch();
        _.forEach(hostingFolders, function (hostingFolder) {
            hostingFolder.isFolder = true;
        });
        _.forEach(hostingFiles, function (hostingFile) {
            hostingFile.file = Files.findOne(hostingFile.file);
        });
        return _.union(hostingFolders, hostingFiles);
    },
    currentFolderAsObject: function () {
        var currentFolder = getCurrentFolder();
        if (currentFolder) {
            return {
                f: currentFolder
            };
        }
        return {};
    },
    nextFolderAsObject: function () {
        return {
            f: this._id
        };
    },
    displayTools: function () {
        return !isSearching();
    },
    searchQuery: function () {
        return getCurrentSearchQuery();
    }
});

Template.hosting.events({
    'submit form[name="search"]': function (e) {
        e.preventDefault();
        if (!getFormSearchQuery()) {
            Router.go('hosting');
        } else {
            Router.go('hosting.search', {
                terms: getFormSearchQuery()
            });
        }
    }
});

function getCurrentFolder() {
    return Router.current().params.query.f;
}

function generateBreadcrumbs(folderId, breadcrumbs) {
    breadcrumbs = breadcrumbs ? breadcrumbs : [];
    var folder = HostingFolders.findOne(folderId);

    if (folder) {
        breadcrumbs.unshift(folder);
        if (folder.parent) {
            return generateBreadcrumbs(folder.parent, breadcrumbs);
        }
    }

    return breadcrumbs;
}

function isSearching() {
    return Router.current().route.getName() === 'hosting.search';
}

function getFormSearchQuery() {
    return $('form[name="search"] input').val();
}

function getCurrentSearchQuery() {
    return isSearching() && Router.current().params.terms;
}