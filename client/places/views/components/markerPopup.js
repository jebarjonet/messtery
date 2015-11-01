Template.markerPopup.helpers({
    updateLinkData: function () {
        return {id: this._id};
    }
});

Template.markerPopup.events({
    'click .delete-action': function () {
        Modal.show('deletePlaceModal', this);
    }
});